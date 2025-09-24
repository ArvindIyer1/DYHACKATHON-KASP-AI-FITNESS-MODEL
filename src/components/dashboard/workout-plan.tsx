"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Dumbbell, Zap } from 'lucide-react';
import { useUser } from '@/context/user-context';
import { Badge } from '@/components/ui/badge';

export function WorkoutPlan() {
  const { currentUser } = useUser();
  const { workoutPlan } = currentUser || {};

  if (!workoutPlan) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Workout Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No workout plan found. Create one from the onboarding page!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            <span>Week {workoutPlan.week}: Your Plan</span>
        </CardTitle>
        <CardDescription>{workoutPlan.weeklyGoal}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Accordion type="single" collapsible defaultValue="item-0">
          {workoutPlan.schedule.map((day, index) => (
            <AccordionItem value={`item-${index}`} key={day.day}>
              <AccordionTrigger className="font-semibold">
                <div className="flex items-center gap-4">
                  <span>{day.day}</span>
                  <Badge variant="outline">{day.title}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4" />
                    Focus: {day.focus}
                  </p>
                  <ul className="space-y-3">
                    {day.exercises.map((ex) => (
                      <li key={ex.name} className="flex items-start gap-3">
                        <Dumbbell className="w-4 h-4 mt-1 text-primary" />
                        <div>
                          <p className="font-medium">{ex.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {ex.sets} sets, {ex.reps} reps, {ex.rest} rest
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-6">
            <h4 className="font-semibold mb-2">Wellness Suggestions</h4>
            <ul className="space-y-2">
                {workoutPlan.wellnessSuggestions.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{s}</span>
                    </li>
                ))}
            </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="secondary">Adapt My Plan</Button>
      </CardFooter>
    </Card>
  );
}
