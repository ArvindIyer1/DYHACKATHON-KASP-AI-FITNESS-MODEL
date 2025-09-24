
export type User = {
  id: string;
  name: string;
  avatarId: string;
  email: string;
  password?: string; // Insecure, for prototype only
  points: number;
  streak: number;
  achievements: string[];
  workoutPlan?: WorkoutPlan;
  activityLog: ActivityLog[];
  fitnessGoals: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
};

export type ActivityLog = {
  id: string;
  date: string; // YYYY-MM-DD
  activity: string;
  duration: number; // in minutes
  intensity: 'Low' | 'Medium' | 'High';
  notes?: string;
};

export type WorkoutDay = {
  day: string;
  title: string;
  focus: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
    rest: string;
  }[];
};

export type WorkoutPlan = {
  week: number;
  weeklyGoal: string;
  schedule: WorkoutDay[];
  wellnessSuggestions: string[];
};
