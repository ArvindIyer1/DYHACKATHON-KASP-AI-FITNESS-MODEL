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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.657-3.356-11.303-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,36.49,44,30.659,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

export function OnboardingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { addUser, setCurrentUserById } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "Random@gmail.com",
      password: "password",
    },
  });

  // Dummy submit handler, replace with actual auth logic
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you'd get the user from the backend response
    // And the workout plan would be generated in a separate step or on the dashboard
    const newUser: User = {
        id: values.email,
        name: values.email.split('@')[0],
        email: values.email,
        avatarId: 'new-user',
        points: 0,
        streak: 0,
        achievements: [],
        activityLog: [],
        fitnessGoals: 'To be set',
        experienceLevel: 'Beginner',
    };

    addUser(newUser);
    setCurrentUserById(newUser.id);
    
    toast({
        title: "Account Created!",
        description: "Welcome to Fitness! Let's get started.",
    });

    // Redirect to a simplified post-signup page or dashboard
    router.push('/dashboard');

    setIsLoading(false);
  }

  return (
    <Card className="bg-background/20 border-white/20 backdrop-blur-sm text-white">
      <CardContent className="p-6 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@example.com" {...field} className="bg-white/10 border-white/20 focus:bg-white/20 text-white placeholder:text-white/50" />
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
                  <FormLabel className="text-white/80">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="bg-white/10 border-white/20 focus:bg-white/20 text-white placeholder:text-white/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold py-6" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up with Email"}
            </Button>
          </form>
        </Form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background/20 px-2 text-white/50 backdrop-blur-sm">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white text-base font-semibold py-6">
          <GoogleIcon className="mr-2"/>
          Continue with Google
        </Button>
        
        <Separator className="bg-white/20" />

        <div>
            <p className="text-center text-sm text-white/50">Already have an account? <a href="#" className="font-semibold text-accent hover:underline">Log in</a></p>
        </div>

      </CardContent>
    </Card>
  );
}
