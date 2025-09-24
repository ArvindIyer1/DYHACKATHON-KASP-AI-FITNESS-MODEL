"use client";

import React from "react";
import { useUser } from "@/context/user-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Trophy, 
  Target, 
  Zap, 
  Star, 
  Award,
  TrendingUp,
  Crown,
  Flame
} from "lucide-react";
import { 
  getUserLevel, 
  getNextLevel, 
  getProgressToNextLevel,
  ACHIEVEMENTS,
  LEVELS,
  getMotivationalMessage
} from "@/lib/gamification";

export function GamificationDashboard() {
  const { currentUser } = useUser();

  if (!currentUser) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>Please log in to view your achievements and progress.</p>
        </CardContent>
      </Card>
    );
  }

  const currentLevel = getUserLevel(currentUser.points);
  const nextLevel = getNextLevel(currentUser.points);
  const progressToNext = getProgressToNextLevel(currentUser.points);
  const motivationalMessage = getMotivationalMessage(currentUser.points, currentUser.streak);

  // Get earned achievements
  const earnedAchievements = ACHIEVEMENTS.filter(achievement => 
    currentUser.achievements.includes(achievement.id)
  );

  // Get next achievements to unlock
  const nextAchievements = ACHIEVEMENTS.filter(achievement => 
    !currentUser.achievements.includes(achievement.id)
  ).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Motivational Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Hey {currentUser.name}! 👋</h2>
              <p className="text-blue-100">{motivationalMessage}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl mb-1">{currentLevel.badge}</div>
              <p className="text-sm text-blue-100">Level {currentLevel.level}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
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
            <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <p className="text-2xl font-bold">{currentUser.streak}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">{earnedAchievements.length}</p>
            <p className="text-sm text-muted-foreground">Achievements</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Crown className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
            <p className="text-2xl font-bold">Level {currentLevel.level}</p>
            <p className="text-sm text-muted-foreground">{currentLevel.name}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Level Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{currentLevel.name}</p>
                <p className="text-sm text-muted-foreground">Level {currentLevel.level}</p>
              </div>
              <div className="text-4xl">{currentLevel.badge}</div>
            </div>
            
            {nextLevel ? (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to {nextLevel.name}</span>
                    <span>{progressToNext}%</span>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {nextLevel.minPoints - currentUser.points} points to next level
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="font-medium mb-2">Next Level Benefits:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {nextLevel.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <Crown className="w-12 h-12 mx-auto mb-2 text-yellow-500" />
                <p className="font-semibold">Maximum Level Reached!</p>
                <p className="text-sm text-muted-foreground">You're a fitness legend!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Level Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Current Perks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{currentLevel.badge}</div>
              <div>
                <p className="font-semibold">{currentLevel.name}</p>
                <p className="text-sm text-muted-foreground">
                  {currentLevel.minPoints} - {currentLevel.maxPoints === Infinity ? '∞' : currentLevel.maxPoints} points
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <p className="font-medium mb-3">Your Current Benefits:</p>
              <div className="space-y-2">
                {currentLevel.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <Target className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earned Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Earned Achievements ({earnedAchievements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {earnedAchievements.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {earnedAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {achievement.category}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">No achievements yet</p>
                <p className="text-sm text-muted-foreground">Start working out to earn your first badge!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Next to Unlock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nextAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 border rounded-lg opacity-75">
                  <div className="text-2xl grayscale">{achievement.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    {achievement.pointsRequired && (
                      <p className="text-xs text-blue-600 mt-1">
                        {achievement.pointsRequired - currentUser.points} more points needed
                      </p>
                    )}
                    {achievement.streakRequired && (
                      <p className="text-xs text-orange-600 mt-1">
                        {achievement.streakRequired - currentUser.streak} more days streak needed
                      </p>
                    )}
                    {achievement.activityCountRequired && (
                      <p className="text-xs text-green-600 mt-1">
                        {achievement.activityCountRequired - currentUser.activityLog.length} more workouts needed
                      </p>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {achievement.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Levels Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            All Levels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEVELS.map((level) => (
              <div 
                key={level.level}
                className={`p-4 border rounded-lg text-center ${
                  level.level === currentLevel.level 
                    ? 'border-blue-500 bg-blue-50' 
                    : level.level < currentLevel.level 
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                }`}
              >
                <div className="text-3xl mb-2">{level.badge}</div>
                <p className="font-semibold text-sm">{level.name}</p>
                <p className="text-xs text-muted-foreground mb-2">Level {level.level}</p>
                <p className="text-xs text-muted-foreground">
                  {level.minPoints} - {level.maxPoints === Infinity ? '∞' : level.maxPoints} pts
                </p>
                {level.level === currentLevel.level && (
                  <Badge className="mt-2 text-xs">Current</Badge>
                )}
                {level.level < currentLevel.level && (
                  <Badge variant="secondary" className="mt-2 text-xs">Completed</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}