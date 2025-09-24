"use client";

import { FitnessChatbot } from "@/components/fitness-chatbot";
import { UserProvider } from "@/context/user-context";

export default function AICoachPage() {
  return (
    <UserProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Fitness Coach</h1>
          <p className="text-muted-foreground">
            Chat with your personal AI fitness coach for workouts, challenges, motivation, and more!
          </p>
        </div>
        <FitnessChatbot />
      </div>
    </UserProvider>
  );
}