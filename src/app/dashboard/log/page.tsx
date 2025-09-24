import { ActivityLogForm } from '@/components/activity-log-form';

export default function LogActivityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Log an Activity</h1>
        <p className="text-muted-foreground">
          Track your progress by logging your workouts and wellness activities.
        </p>
      </div>
      <ActivityLogForm />
    </div>
  );
}
