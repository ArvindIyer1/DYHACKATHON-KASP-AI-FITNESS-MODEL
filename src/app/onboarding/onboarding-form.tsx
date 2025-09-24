"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { generateInitialWorkoutPlan } from "@/ai/flows/generate-initial-workout-plan";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import type { WorkoutPlan, User } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  fitnessGoals: z.string().min(10, { message: "Please describe your goals in more detail." }),
  experienceLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  availableTime: z.string().min(3, { message: "Please specify your available time." }),
  preferredActivities: z.string().min(5, { message: "List at least one activity." }),
  wellnessPreferences: z.string().min(5, { message: "List at least one preference." }),
});

export function OnboardingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { addUser, setCurrentUserById } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fitnessGoals: "",
      experienceLevel: "Beginner",
      availableTime: "",
      preferredActivities: "",
      wellnessPreferences: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const { workoutPlan: planString, wellnessSuggestions } = await generateInitialWorkoutPlan(values);
      
      // A simple parser for the AI's markdown output. This should be made more robust in a real app.
      const parsedPlan: WorkoutPlan = {
        week: 1,
        weeklyGoal: 'Start your new personalized plan!',
        schedule: [],
        wellnessSuggestions: wellnessSuggestions.split('\n- ').filter(s => s),
      };

      const newUser: User = {
        id: values.name.toLowerCase().replace(/\s/g, "-") + Date.now(),
        name: values.name,
        avatarId: 'new-user',
        email: `${values.name.toLowerCase().replace(/\s/g, ".")}@synergy.life`,
        points: 0,
        streak: 0,
        achievements: [],
        workoutPlan: parsedPlan, // Simplified for now
        activityLog: [],
        fitnessGoals: values.fitnessGoals,
        experienceLevel: values.experienceLevel,
      };

      addUser(newUser);
      setCurrentUserById(newUser.id);
      
      toast({
        title: "Profile Created!",
        description: "Your personalized plan is ready. Welcome to Synergy Life!",
      });
      router.push('/dashboard');

    } catch (error) {
      console.error("Failed to generate workout plan:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem creating your plan. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Your Wellness Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Alex Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fitnessGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fitness Goals</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., lose 10 pounds, run a 5k, increase bench press" {...field} />
                  </FormControl>
                  <FormDescription>What do you want to achieve?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availableTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Commitment</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 3 days a week, 45 minutes per session" {...field} />
                  </FormControl>
                  <FormDescription>How much time can you dedicate to workouts?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredActivities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Activities</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., running, weightlifting, yoga, swimming" {...field} />
                  </FormControl>
                   <FormDescription>What activities do you enjoy?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wellnessPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wellness Preferences</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., meditation, journaling, meal prepping" {...field} />
                  </FormControl>
                   <FormDescription>Any other wellness habits you're interested in?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Your Plan...
                </>
              ) : (
                "Create My Plan"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
