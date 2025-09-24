"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Trophy, 
  Target, 
  Zap, 
  Star, 
  MessageCircle, 
  Dumbbell,
  Award,
  TrendingUp,
  Phone,
  MapPin,
  Send,
  Bot,
  User
} from "lucide-react";

const MOCK_API = "https://jsonplaceholder.typicode.com";
const EXTERNAL_CHATBOT_URL = process.env.NEXT_PUBLIC_EXTERNAL_CHATBOT_URL || "http://192.168.1.25:5678/webhook/chat";
const ENABLE_EXTERNAL_CHATBOT = process.env.NEXT_PUBLIC_ENABLE_EXTERNAL_CHATBOT === "true";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  type?: "achievement" | "challenge" | "normal";
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  type: "daily" | "weekly" | "special";
}

interface LeaderboardUser {
  name: string;
  points: number;
  level: number;
  streak: number;
}

export function FitnessChatbot() {
  const { currentUser, updateCurrentUser } = useUser();
  const { toast } = useToast();
  
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [showTrainerForm, setShowTrainerForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [externalChatbotStatus, setExternalChatbotStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  // Initialize challenges
  useEffect(() => {
    const dailyChallenges: Challenge[] = [
      {
        id: "daily-1",
        title: "Morning Warrior",
        description: "Complete a 30-minute morning workout",
        points: 50,
        completed: false,
        type: "daily"
      },
      {
        id: "daily-2", 
        title: "Hydration Hero",
        description: "Drink 8 glasses of water today",
        points: 25,
        completed: false,
        type: "daily"
      },
      {
        id: "weekly-1",
        title: "Consistency Champion",
        description: "Work out 5 days this week",
        points: 200,
        completed: false,
        type: "weekly"
      },
      {
        id: "special-1",
        title: "Personal Best",
        description: "Beat your previous workout record",
        points: 100,
        completed: false,
        type: "special"
      }
    ];
    setChallenges(dailyChallenges);
  }, []);

  // Initialize chat with welcome message
  useEffect(() => {
    if (currentUser && chatLog.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        sender: "bot",
        text: `Welcome back, ${currentUser.name}! 🏋️‍♀️ I'm your AI Fitness Coach. I can help you log workouts, set challenges, request a personal trainer, or just chat about your fitness journey. What would you like to do today?`,
        timestamp: new Date(),
        type: "normal"
      };
      setChatLog([welcomeMessage]);
    }
  }, [currentUser]);

  // Fetch mock leaderboard
  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${MOCK_API}/users?_limit=5`);
      const mockLeaderboard: LeaderboardUser[] = res.data.map((u: any, index: number) => ({
        name: u.name,
        points: Math.floor(Math.random() * 1000) + 500,
        level: Math.floor(Math.random() * 10) + 1,
        streak: Math.floor(Math.random() * 30) + 1
      }));
      
      // Add current user to leaderboard
      if (currentUser) {
        mockLeaderboard.push({
          name: currentUser.name,
          points: currentUser.points,
          level: Math.floor(currentUser.points / 100) + 1,
          streak: currentUser.streak
        });
      }
      
      setLeaderboard(mockLeaderboard.sort((a, b) => b.points - a.points));
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    checkExternalChatbotConnection();
  }, [currentUser]);

  // Add points and achievements
  const awardPoints = (points: number, reason: string) => {
    if (!currentUser) return;
    
    const newPoints = currentUser.points + points;
    const newStreak = currentUser.streak + 1;
    const newAchievements = [...currentUser.achievements];
    
    // Check for new achievements
    if (newPoints >= 1000 && !newAchievements.includes("Points Master")) {
      newAchievements.push("Points Master");
      toast({
        title: "🏆 Achievement Unlocked!",
        description: "Points Master - Earned 1000+ points!",
      });
    }
    
    if (newStreak >= 7 && !newAchievements.includes("Week Warrior")) {
      newAchievements.push("Week Warrior");
      toast({
        title: "🏆 Achievement Unlocked!",
        description: "Week Warrior - 7 day streak!",
      });
    }

    updateCurrentUser({
      points: newPoints,
      streak: newStreak,
      achievements: newAchievements
    });

    // Add achievement message to chat
    const achievementMessage: ChatMessage = {
      id: `achievement-${Date.now()}`,
      sender: "bot",
      text: `🎉 Awesome! You earned ${points} points for ${reason}! Total points: ${newPoints}`,
      timestamp: new Date(),
      type: "achievement"
    };
    
    setChatLog(prev => [...prev, achievementMessage]);
    fetchLeaderboard(); // Refresh leaderboard
  };

  // Check external chatbot connection
  const checkExternalChatbotConnection = async () => {
    if (!ENABLE_EXTERNAL_CHATBOT) {
      setExternalChatbotStatus('disconnected');
      return;
    }
    
    try {
      setExternalChatbotStatus('checking');
      const response = await axios.get(EXTERNAL_CHATBOT_URL.replace('/webhook/chat', '/health'), {
        timeout: 5000
      });
      setExternalChatbotStatus('connected');
    } catch (error) {
      setExternalChatbotStatus('disconnected');
    }
  };

  // Call external chatbot API
  const callExternalChatbot = async (message: string): Promise<string | null> => {
    try {
      const response = await axios.post(EXTERNAL_CHATBOT_URL, {
        message: message,
        user: {
          name: currentUser?.name || "User",
          points: currentUser?.points || 0,
          streak: currentUser?.streak || 0,
          level: currentUser?.experienceLevel || "Beginner"
        },
        context: "fitness_coaching"
      }, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return response.data.response || response.data.message || response.data.text || "I'm here to help with your fitness journey!";
    } catch (error) {
      console.warn("External chatbot unavailable, falling back to local responses:", error);
      return null; // Will trigger fallback
    }
  };

  // Process bot responses
  const processMessage = async (userMessage: string) => {
    setIsLoading(true);
    
    try {
      let botResponse = "";
      
      // Try external chatbot first if enabled
      if (ENABLE_EXTERNAL_CHATBOT) {
        const externalResponse = await callExternalChatbot(userMessage);
        if (externalResponse) {
          botResponse = externalResponse;
          
          // Still handle special commands for gamification
          if (userMessage.toLowerCase().includes("log workout")) {
            awardPoints(25, "logging a workout");
          }
          
          // Add bot response and return early
          const botMessage: ChatMessage = {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: botResponse,
            timestamp: new Date(),
            type: "normal"
          };
          
          setChatLog(prev => [...prev, botMessage]);
          return;
        }
      }
      
      // Fallback to local responses if external chatbot fails or is disabled
      
      if (userMessage.toLowerCase().includes("log workout") || userMessage.toLowerCase().includes("workout")) {
        await axios.post(`${MOCK_API}/posts`, { 
          userId: currentUser?.id, 
          message: "log workout" 
        });
        
        botResponse = "🏋️‍♀️ Excellent! Workout logged successfully! You're crushing your fitness goals!";
        awardPoints(25, "logging a workout");
        
      } else if (userMessage.toLowerCase().includes("personal trainer") || userMessage.toLowerCase().includes("trainer")) {
        botResponse = "🏃‍♂️ I'd love to help you connect with a personal trainer! Please provide your contact details below.";
        setShowTrainerForm(true);
        
      } else if (userMessage.toLowerCase().includes("challenge")) {
        const incompleteChallenges = challenges.filter(c => !c.completed);
        if (incompleteChallenges.length > 0) {
          const randomChallenge = incompleteChallenges[Math.floor(Math.random() * incompleteChallenges.length)];
          botResponse = `🎯 Here's a challenge for you: "${randomChallenge.title}" - ${randomChallenge.description}. Complete it to earn ${randomChallenge.points} points!`;
        } else {
          botResponse = "🌟 Wow! You've completed all available challenges. New ones will be added soon!";
        }
        
      } else if (userMessage.toLowerCase().includes("leaderboard") || userMessage.toLowerCase().includes("ranking")) {
        const userRank = leaderboard.findIndex(u => u.name === currentUser?.name) + 1;
        botResponse = `🏆 You're currently ranked #${userRank} on the leaderboard with ${currentUser?.points} points! Keep pushing to climb higher!`;
        
      } else if (userMessage.toLowerCase().includes("motivation") || userMessage.toLowerCase().includes("motivate")) {
        const motivationalQuotes = [
          "💪 The only bad workout is the one that didn't happen!",
          "🔥 Your body can do it. It's your mind you need to convince!",
          "⭐ Progress, not perfection. Every step counts!",
          "🚀 The pain you feel today will be the strength you feel tomorrow!",
          "🎯 Champions train, losers complain. Which one are you today?"
        ];
        botResponse = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        
      } else if (userMessage.toLowerCase().includes("help")) {
        botResponse = `🤖 I'm here to help! Here's what I can do:
        
🏋️‍♀️ Say "log workout" to record your exercise
🎯 Ask for a "challenge" to get daily/weekly goals  
🏃‍♂️ Request a "personal trainer" for 1-on-1 coaching
🏆 Check "leaderboard" to see your ranking
💪 Ask for "motivation" when you need a boost
📊 Get workout tips and fitness advice

What would you like to try?`;
        
      } else {
        const responses = [
          "That's great! Keep up the awesome work! 💪",
          "I love your dedication to fitness! 🌟",
          "You're on the right track! Every step matters! 🚀",
          "Amazing! Your consistency is inspiring! ⭐",
          "Keep pushing! You've got this! 🔥"
        ];
        botResponse = responses[Math.floor(Math.random() * responses.length)];
      }

      // Add bot response to chat
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponse,
        timestamp: new Date(),
        type: "normal"
      };
      
      setChatLog(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error("Error processing message:", error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: "bot",
        text: "Oops! I'm having some technical difficulties. Let's keep working out while I get back up to speed! 💪",
        timestamp: new Date(),
        type: "normal"
      };
      setChatLog(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: message,
      timestamp: new Date(),
      type: "normal"
    };
    
    setChatLog(prev => [...prev, userMessage]);
    
    // Process the message
    await processMessage(message);
    setMessage("");
  };

  const submitTrainerRequest = async () => {
    if (!phone || !address) {
      toast({
        title: "Missing Information",
        description: "Please provide both phone number and address.",
        variant: "destructive"
      });
      return;
    }

    try {
      await axios.post(`${MOCK_API}/posts`, {
        userId: currentUser?.id,
        name: currentUser?.name,
        phone,
        address,
        message: "Personal trainer request"
      });

      const successMessage: ChatMessage = {
        id: `trainer-${Date.now()}`,
        sender: "bot",
        text: "🎉 Perfect! Your personal trainer request has been submitted to our support team. They'll contact you within 24 hours to match you with the perfect trainer for your goals!",
        timestamp: new Date(),
        type: "normal"
      };
      
      setChatLog(prev => [...prev, successMessage]);
      setPhone("");
      setAddress("");
      setShowTrainerForm(false);
      
      awardPoints(50, "requesting a personal trainer");
      
      toast({
        title: "Request Submitted!",
        description: "We'll contact you soon about your personal trainer.",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit trainer request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const completeChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge || challenge.completed) return;

    setChallenges(prev => 
      prev.map(c => 
        c.id === challengeId ? { ...c, completed: true } : c
      )
    );

    awardPoints(challenge.points, `completing the "${challenge.title}" challenge`);
    
    toast({
      title: "🎯 Challenge Completed!",
      description: `You earned ${challenge.points} points for "${challenge.title}"!`,
    });
  };

  if (!currentUser) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6 text-center">
          <p>Please log in to access the AI Fitness Coach.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">{currentUser.points}</p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold">{currentUser.streak}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">{currentUser.achievements.length}</p>
            <p className="text-sm text-muted-foreground">Achievements</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">Level {Math.floor(currentUser.points / 100) + 1}</p>
            <p className="text-sm text-muted-foreground">Fitness Level</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div className="flex items-center gap-2">
                AI Fitness Coach 
                {ENABLE_EXTERNAL_CHATBOT && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    externalChatbotStatus === 'connected' 
                      ? 'bg-green-100 text-green-800' 
                      : externalChatbotStatus === 'checking'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {externalChatbotStatus === 'connected' && '🌐 Enhanced AI'}
                    {externalChatbotStatus === 'checking' && '⏳ Connecting...'}
                    {externalChatbotStatus === 'disconnected' && '📱 Local AI'}
                  </span>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chat Messages */}
            <ScrollArea className="h-80 w-full border rounded-lg p-4">
              <div className="space-y-4">
                {chatLog.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex gap-3 ${
                      chat.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-2 max-w-[80%] ${
                        chat.sender === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {chat.sender === "user" ? (
                          <User className="w-6 h-6 text-blue-500" />
                        ) : (
                          <Bot className="w-6 h-6 text-green-500" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          chat.sender === "user"
                            ? "bg-blue-500 text-white"
                            : chat.type === "achievement"
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{chat.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Bot className="w-6 h-6 text-green-500" />
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm">AI Coach is thinking...</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask your AI coach anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} disabled={!message.trim() || isLoading}>
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Trainer Request Form */}
            {showTrainerForm && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">Personal Trainer Request</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <Input
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address
                    </label>
                    <Textarea
                      placeholder="Your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={submitTrainerRequest} className="flex-1">
                      Submit Request
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowTrainerForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => processMessage("log workout")}
              >
                <Dumbbell className="w-4 h-4 mr-2" />
                Log Workout
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => processMessage("challenge")}
              >
                <Target className="w-4 h-4 mr-2" />
                Get Challenge
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => processMessage("motivation")}
              >
                <Star className="w-4 h-4 mr-2" />
                Get Motivated
              </Button>
            </CardContent>
          </Card>

          {/* Active Challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {challenges.filter(c => !c.completed).map((challenge) => (
                  <div key={challenge.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{challenge.title}</p>
                        <p className="text-xs text-muted-foreground">{challenge.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={challenge.type === "daily" ? "default" : challenge.type === "weekly" ? "secondary" : "destructive"}>
                            {challenge.type}
                          </Badge>
                          <span className="text-xs font-medium text-yellow-600">
                            {challenge.points} pts
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => completeChallenge(challenge.id)}
                        className="ml-2"
                      >
                        Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboard.slice(0, 5).map((user, index) => (
                  <div 
                    key={`${user.name}-${index}`}
                    className={`flex items-center justify-between p-2 rounded ${
                      user.name === currentUser.name ? "bg-blue-50 border border-blue-200" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">#{index + 1}</span>
                      <span className="text-sm">{user.name}</span>
                      {user.name === currentUser.name && (
                        <Badge variant="secondary" className="text-xs">You</Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{user.points} pts</p>
                      <p className="text-xs text-muted-foreground">Level {user.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}