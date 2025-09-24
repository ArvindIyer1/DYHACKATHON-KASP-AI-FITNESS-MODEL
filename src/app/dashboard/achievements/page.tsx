"use client";

import { GamificationDashboard } from "@/components/gamification-dashboard";
import { UserProvider } from "@/context/user-context";

export default function GamificationPage() {
  return (
    <UserProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Achievements & Progress</h1>
          <p className="text-muted-foreground">
            Track your fitness journey, unlock achievements, and level up your wellness game!
          </p>
        </div>
        <GamificationDashboard />
      </div>
    </UserProvider>
  );
}