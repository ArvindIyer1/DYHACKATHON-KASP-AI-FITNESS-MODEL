
"use client";

import { useUser } from '@/context/user-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Flame, Star, TrendingUp, BarChart, History, Dumbbell, Bike, Heart } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function ProgressPage() {
  const { currentUser } = useUser();

  useEffect(() => {
    if (!currentUser) {
      redirect('/');
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }
  
  // Prepare data for the chart
  const last7Days = currentUser.activityLog.slice(0, 7).reverse();
  const chartData = last7Days.map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      duration: log.duration,
  }));

  const totalDuration = last7Days.reduce((sum, log) => sum + log.duration, 0);

  const getActivityIcon = (activity: string) => {
    const lowerCaseActivity = activity.toLowerCase();
    if (lowerCaseActivity.includes('run')) return <TrendingUp className="w-5 h-5" />;
    if (lowerCaseActivity.includes('lift') || lowerCaseActivity.includes('weight')) return <Dumbbell className="w-5 h-5" />;
    if (lowerCaseActivity.includes('cycl') || lowerCaseActivity.includes('bike')) return <Bike className="w-5 h-5" />;
    return <Heart className="w-5 h-5" />;
  };

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Your Progress</h1>
        <p className="text-muted-foreground">
          A look at your recent activity and achievements.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Synergy Points</CardTitle>
            <Star className="h-4 w-4 text-accent" fill="currentColor" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.points.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" fill="currentColor" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.streak} days</div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Activity (Last 7 Days)</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart className="w-5 h-5" /> Activity This Week</CardTitle>
            <CardDescription>Minutes of activity logged in the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer config={{
                  duration: {
                    label: 'Minutes',
                    color: 'hsl(var(--primary))',
                  },
              }}>
                  <RechartsBarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                      <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <Tooltip 
                          cursor={false} 
                          content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Bar dataKey="duration" fill="var(--color-duration)" radius={8} />
                  </RechartsBarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><History className="w-5 h-5" /> Activity History</CardTitle>
            <CardDescription>Your recently logged activities.</CardDescription>
          </CardHeader>
          <CardContent className="h-80 p-0">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-4">
                {currentUser.activityLog.length > 0 ? (
                  currentUser.activityLog.map((log, index) => (
                    <div key={log.id}>
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 text-primary p-2 rounded-full">
                            {getActivityIcon(log.activity)}
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold">{log.activity}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(log.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{log.duration} min</p>
                          <p className="text-sm text-muted-foreground">{log.intensity}</p>
                        </div>
                      </div>
                      {index < currentUser.activityLog.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center">No activities logged yet.</p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Award className="w-5 h-5" /> Achievements</CardTitle>
          <CardDescription>Badges you've earned on your wellness journey.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {currentUser.achievements.length > 0 ? (
            currentUser.achievements.map((ach, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-1 px-3 bg-accent/20 text-accent-foreground border-accent">
                {ach}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Start logging activities to earn achievements!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
