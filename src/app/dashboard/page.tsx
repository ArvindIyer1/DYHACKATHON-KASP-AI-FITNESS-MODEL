
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
} from 'lucide-react';
import { DashboardCard } from '@/components/dashboard/dashboard-card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const [aiQuestion, setAiQuestion] = useState('');
  return (
    <div className="space-y-6">
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
          title="Synergy Points"
          value="1,250"
          footer="Level 5"
          icon={Star}
        >
           <div className="mt-2 space-y-2">
            <Progress value={(1250 % 1000) / 10} aria-label="Points progress to next level" />
            <p className="text-xs text-muted-foreground">750 points to Level 6</p>
          </div>
        </DashboardCard>
      </div>
      <div className="grid gap-6">
        <DashboardCard
          title="AI Progress Summary"
          value=""
          footer="An AI-generated look at your recent progress."
          icon={Bot}
          className="lg:col-span-2"
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              You've shown great consistency this week, hitting all your strength
              training goals. Your cardio endurance is steadily improving.
              Consider adding a yoga session for flexibility.
            </p>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="question">Ask AI Expert</Label>
              <Textarea 
                placeholder="e.g., How can I improve my bench press?" 
                id="question"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button>
                <Bot className="mr-2 h-4 w-4" />
                Ask Question
              </Button>
            </div>
          </div>
        </DashboardCard>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
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
