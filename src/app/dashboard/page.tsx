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

export default function DashboardPage() {
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
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCard
          title="AI Progress Summary"
          value=""
          footer="An AI-generated look at your recent progress."
          icon={Bot}
          className="lg:col-span-1"
        >
          <p className="text-sm text-muted-foreground mt-2">
            You've shown great consistency this week, hitting all your strength
            training goals. Your cardio endurance is steadily improving.
            Consider adding a yoga session for flexibility.
          </p>
        </DashboardCard>
        <DashboardCard
          title="Achievements"
          value=""
          footer="Badges you've earned."
          icon={Award}
          className="lg:col-span-1"
        >
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="bg-primary/10 text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
              First 5k
            </div>
            <div className="bg-primary/10 text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
              30-Day Challenge
            </div>
            <div className="bg-primary/10 text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
              Morning Lark
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
