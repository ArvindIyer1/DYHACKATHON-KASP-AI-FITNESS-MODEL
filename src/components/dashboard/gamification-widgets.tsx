"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/context/user-context';
import { Flame, Star, Trophy } from 'lucide-react';

export function GamificationWidgets() {
  const { currentUser } = useUser();

  if (!currentUser) return null;

  const { points, streak, achievements } = currentUser;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Synergy Points</CardTitle>
          <Star className="h-4 w-4 text-accent" fill="currentColor" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{points.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Keep it up!</p>
        </CardContent>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          <Flame className="h-4 w-4 text-orange-500" fill="currentColor" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{streak} days</div>
          <p className="text-xs text-muted-foreground">Don't break the chain.</p>
        </CardContent>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Achievements</CardTitle>
          <Trophy className="h-4 w-4 text-yellow-500" fill="currentColor" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{achievements.length}</div>
          <p className="text-xs text-muted-foreground">{achievements[achievements.length - 1] || 'Start to earn!'}</p>
        </CardContent>
      </Card>
    </div>
  );
}
