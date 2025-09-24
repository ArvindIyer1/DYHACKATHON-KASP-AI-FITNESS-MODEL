

"use client";

import {
  Activity,
  Award,
  Calendar,
  Flame,
  HeartPulse,
  Bot,
  Dumbbell,
  Star,
  Video,
  Trophy,
  Target,
  Crown,
} from 'lucide-react';
import { DashboardCard } from '@/components/dashboard/dashboard-card';
import { Button } from '@/components/ui/button';


import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useUser } from '@/context/user-context';
import { getUserLevel, getNextLevel, getProgressToNextLevel } from '@/lib/gamification';

export default function DashboardPage() {
  const { currentUser } = useUser();
  
  const currentLevel = getUserLevel(currentUser?.points || 0);
  const nextLevel = getNextLevel(currentUser?.points || 0);
  const progress = getProgressToNextLevel(currentUser?.points || 0);
  
  // Mock recent achievements
  const recentAchievements = [
    { name: "Early Bird", icon: "🌅", description: "Completed morning workout" },
    { name: "Streak Master", icon: "🔥", description: "5-day workout streak" },
    { name: "Hydration Hero", icon: "💧", description: "Daily water goal achieved" },
  ];
  return (
    <div className="space-y-6">
      {/* Gamification Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Crown className="h-5 w-5" />
            <CardTitle className="ml-2 text-sm font-medium">Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentLevel.name}</div>
            <p className="text-xs text-purple-100">
              {currentUser?.points || 0} total points
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Flame className="h-5 w-5" />
            <CardTitle className="ml-2 text-sm font-medium">Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser?.streak || 0}</div>
            <p className="text-xs text-orange-100">days in a row</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Trophy className="h-5 w-5" />
            <CardTitle className="ml-2 text-sm font-medium">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser?.achievements?.length || 0}</div>
            <p className="text-xs text-green-100">unlocked</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Target className="h-5 w-5" />
            <CardTitle className="ml-2 text-sm font-medium">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(progress)}%</div>
            <p className="text-xs text-blue-100">to {nextLevel?.name || 'Max Level'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Level Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{currentLevel.name}</span>
            <span className="text-sm text-muted-foreground">
              {nextLevel ? `${Math.round(progress)}% to ${nextLevel.name}` : 'Max Level Reached!'}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{currentLevel.minPoints} pts</span>
            <span>{nextLevel?.minPoints || 'Max'} pts</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{achievement.name}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/dashboard/achievements">
              <Button variant="outline" className="w-full">
                View All Achievements
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* AI Coach Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            AI Fitness Coach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Get personalized advice, challenges, and motivation from your AI coach.
          </p>
          <div className="flex gap-2">
            <Link href="/dashboard/ai-coach" className="flex-1">
              <Button className="w-full">
                <Bot className="h-4 w-4 mr-2" />
                Chat with Coach
              </Button>
            </Link>
            <Button variant="outline">
              <Dumbbell className="h-4 w-4 mr-2" />
              New Challenge
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Next Workout"
          value="Upper Body Strength"
          footer="Today at 5:00 PM"
          icon={Dumbbell}
        />
        <DashboardCard
          title="Current Plan"
          value="Build Muscle"
          footer="Week 2 of 8"
          icon={Calendar}
        />
        <DashboardCard
          title="Wellness Score"
          value="8.5/10"
          footer="+0.3 from last week"
          icon={HeartPulse}
        />
        <DashboardCard
          title="Current Streak"
          value="12 days"
          footer="Keep it up!"
          icon={Flame}
        />
        <DashboardCard
          title="Last Activity"
          value="Morning Run"
          footer="Yesterday, 30 min"
          icon={Activity}
        />
        <DashboardCard
          title="Weekly Goal"
          value="4/5"
          footer="Workouts completed"
          icon={Target}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <DashboardCard
          title="Today's Focus"
          value="Upper Body Strength"
          footer="Push-ups, Pull-ups, Bench Press"
          icon={Dumbbell}
        >
          <div className="mt-4 flex gap-2">
            <Badge variant="secondary">Chest</Badge>
            <Badge variant="secondary">Arms</Badge>
            <Badge variant="secondary">Shoulders</Badge>
          </div>
        </DashboardCard>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/track" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Activity className="h-4 w-4 mr-2" />
                Log Workout
              </Button>
            </Link>
            <Link href="/dashboard/schedule" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
            </Link>
            <Link href="/dashboard/progress" className="block">
              <Button variant="outline" className="w-full justify-start">
                <HeartPulse className="h-4 w-4 mr-2" />
                Check Progress
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCard
            title="Track Your Form"
            value=""
            footer="Get AI feedback on your exercise technique."
            icon={Video}
          >
            <div className="flex h-full flex-col items-start justify-center">
              <p className="text-sm text-muted-foreground mb-4">
                Upload a video of your workout to get personalized tips for improvement.
              </p>
              <Button asChild>
                <Link href="/dashboard/track">Upload Video</Link>
              </Button>
            </div>
        </DashboardCard>
        <DashboardCard
          title="Achievements"
          value=""
          footer="Badges you've earned."
          icon={Award}
          className="lg:col-span-1"
        >
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="flex items-center gap-2 bg-primary/10 text-primary-foreground text-sm font-semibold px-3 py-1.5 rounded-full border-2 border-primary/30">
              <Star className="w-4 h-4 text-accent" fill="currentColor" />
              <span>First 5k</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 text-primary-foreground text-sm font-semibold px-3 py-1.5 rounded-full border-2 border-primary/30">
              <Flame className="w-4 h-4 text-orange-400" fill="currentColor" />
              <span>30-Day Challenge</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 text-primary-foreground text-sm font-semibold px-3 py-1.5 rounded-full border-2 border-primary/30">
               <Award className="w-4 h-4 text-blue-400" />
               <span>Morning Lark</span>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
