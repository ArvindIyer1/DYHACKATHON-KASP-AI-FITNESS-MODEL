import { redirect } from 'next/navigation';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { GamificationWidgets } from '@/components/dashboard/gamification-widgets';
import { WorkoutPlan } from '@/components/dashboard/workout-plan';
import { ActivityChart } from '@/components/dashboard/activity-chart';
import { ProgressSummary } from '@/components/dashboard/progress-summary';

export default function DashboardPage() {
  // In a real app, you'd get the user from a session.
  // Here we'll redirect if there's no "current user" in our mock context.
  // This logic would be in a server-side context or middleware.
  // For this example, we assume layout has handled user check or redirect logic.

  return (
    <div className="flex flex-col gap-8">
      <WelcomeHeader />
      <GamificationWidgets />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WorkoutPlan />
        </div>
        <div className="flex flex-col gap-8">
          <ActivityChart />
          <ProgressSummary />
        </div>
      </div>
    </div>
  );
}
