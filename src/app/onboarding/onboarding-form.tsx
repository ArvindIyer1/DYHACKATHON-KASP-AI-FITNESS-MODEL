
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@/context/user-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/lib/types";
import { generateInitialWorkoutPlan } from "@/ai/flows/generate-initial-workout-plan";



const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  fitnessGoals: z.string().min(10, { message: "Please describe your goals in at least 10 characters." }),
  experienceLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  preferredActivities: z.string().min(3, { message: "List at least one activity."}),
  availableTime: z.string().min(3, { message: "Please specify your available time."}),
  gender: z.enum(['male', 'female', 'other']),
  height: z.coerce.number().positive({ message: "Height must be a positive number." }),
  weight: z.coerce.number().positive({ message: "Weight must be a positive number." }),
});

export function OnboardingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { addUser, setCurrentUserById } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      fitnessGoals: "",
      experienceLevel: "Beginner",
      preferredActivities: "",
      availableTime: "",
      gender: "male", // Set default gender
      height: 0,
      weight: 0,
    },
  });

  useEffect(() => {
    const gender = searchParams.get('gender');
    if (gender === 'male' || gender === 'female' || gender === 'other') {
      form.setValue('gender', gender);
    }
  }, [searchParams, form]);


  // Fallback workout plan in case AI generation fails
  const getFallbackWorkoutPlan = (experienceLevel: string) => {
    const beginnerPlan = [
      {
        day: 'Monday',
        title: 'Full Body Introduction',
        focus: 'Basic Movements',
        exercises: [
          { name: 'Bodyweight Squats', sets: '3', reps: '15', rest: '60s' },
          { name: 'Push-ups (on knees)', sets: '3', reps: '10', rest: '60s' },
          { name: 'Plank', sets: '3', reps: '30s', rest: '60s' },
        ],
      },
      {
        day: 'Wednesday',
        title: 'Light Cardio',
        focus: 'Heart Health',
        exercises: [
          { name: 'Brisk Walking', sets: '1', reps: '20 min', rest: 'N/A' },
          { name: 'Jumping Jacks', sets: '3', reps: '30s', rest: '60s' },
          { name: 'High Knees', sets: '3', reps: '30s', rest: '60s' },
        ],
      },
      {
        day: 'Friday',
        title: 'Flexibility and Core',
        focus: 'Stretching & Abs',
        exercises: [
          { name: 'Cat-Cow Stretch', sets: '2', reps: '10', rest: '30s' },
          { name: 'Bird-Dog', sets: '3', reps: '10 per side', rest: '45s' },
          { name: 'Glute Bridges', sets: '3', reps: '15', rest: '60s' },
        ],
      },
    ];

    const intermediatePlan = [
      {
        day: 'Monday',
        title: 'Upper Body Strength',
        focus: 'Chest, Shoulders, Triceps',
        exercises: [
          { name: 'Push-ups', sets: '3', reps: '12-15', rest: '60s' },
          { name: 'Pike Push-ups', sets: '3', reps: '8-10', rest: '60s' },
          { name: 'Tricep Dips', sets: '3', reps: '10-12', rest: '60s' },
        ],
      },
      {
        day: 'Wednesday',
        title: 'Lower Body Power',
        focus: 'Quads, Hamstrings, Glutes',
        exercises: [
          { name: 'Squats', sets: '4', reps: '15-20', rest: '60s' },
          { name: 'Lunges', sets: '3', reps: '12 per leg', rest: '60s' },
          { name: 'Single-leg Glute Bridges', sets: '3', reps: '10 per leg', rest: '60s' },
        ],
      },
      {
        day: 'Friday',
        title: 'Core and Cardio',
        focus: 'Abs and Conditioning',
        exercises: [
          { name: 'Mountain Climbers', sets: '3', reps: '30s', rest: '30s' },
          { name: 'Plank', sets: '3', reps: '45s', rest: '45s' },
          { name: 'Bicycle Crunches', sets: '3', reps: '20', rest: '30s' },
        ],
      },
    ];

    return experienceLevel === 'Beginner' ? beginnerPlan : intermediatePlan;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    try {
      let workoutPlan, wellnessSuggestions;
      
      try {
        // 1. Try to generate AI workout plan
        const planOutput = await generateInitialWorkoutPlan({
          fitnessGoals: values.fitnessGoals,
          experienceLevel: values.experienceLevel,
          availableTime: values.availableTime,
          preferredActivities: values.preferredActivities,
          wellnessPreferences: 'Meditation, stretching', // default value
        });
        
        workoutPlan = planOutput.workoutPlan;
        wellnessSuggestions = planOutput.wellnessSuggestions;
      } catch (aiError) {
        console.warn("AI workout generation failed, using fallback plan:", aiError);
        // Use fallback workout plan
        workoutPlan = getFallbackWorkoutPlan(values.experienceLevel);
        wellnessSuggestions = [
          'Drink a glass of water first thing in the morning.',
          'Try to stand up and stretch for 5 minutes every hour.',
          'Read a book for 15 minutes before bed.',
        ];
      }
      
      // 2. Create the app-specific user profile
      const newUser: User = {
          id: values.email, // Use email as the ID for simplicity
          name: values.name,
          email: values.email,
          password: values.password, // For mock authentication
          avatarId: values.gender === 'female' ? 'new-user-female' : 'new-user-male',
          points: 0,
          streak: 0,
          achievements: [],
          activityLog: [],
          fitnessGoals: values.fitnessGoals,
          experienceLevel: values.experienceLevel,
          workoutPlan: {
            week: 1,
            weeklyGoal: "First week of your new personalized plan!",
            schedule: workoutPlan, 
            wellnessSuggestions: wellnessSuggestions,
          }
      };

      // 3. Save the new user profile to our mock data store
      addUser(newUser);
      
      // 4. Log the user in
      setCurrentUserById(newUser.id);
      
      toast({
          title: "Welcome to Synergy Life!",
          description: "Your account has been created and your plan is ready.",
      });

      router.push('/dashboard');
    } catch(error: unknown) {
      console.error("Failed to sign up:", error);
      toast({
        title: "Sign-up Error",
        description: error instanceof Error ? error.message : "Could not create your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-8 bg-card rounded-lg shadow-lg">
           <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Alex Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="alex@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>
                  Must be at least 8 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="175" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="70" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="fitnessGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitness Goals</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., 'Lose 10 pounds and build more muscle in my legs.'" {...field} />
                </FormControl>
                 <FormDescription>
                  What do you want to achieve? Be specific!
                </FormDescription>
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
                      <SelectValue placeholder="How experienced are you with fitness?" />
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
            name="preferredActivities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Activities</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., running, weightlifting, yoga" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="availableTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Available per Week</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., '3-4 hours', '45 minutes daily'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold py-6" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Create My Account & Plan"}
          </Button>
        </form>
      </Form>
  );
}

    
