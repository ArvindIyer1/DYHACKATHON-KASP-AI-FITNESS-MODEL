
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { UserProvider, useUser } from "@/context/user-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { AppLogo } from "@/components/app-logo";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { GoogleIcon } from "@/components/google-icon";


const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

function LoginPageContent() {
  const [isLoading, setIsLoading] = useState(false);
  const { users, setCurrentUserById } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "Random@gmail.com",
      password: "12345678",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // DEMO: Bypass Firebase for the random user
    if (values.email === 'Random@gmail.com' && values.password === '12345678') {
      const demoUser = users.find(u => u.email === 'Random@gmail.com');
      if (demoUser) {
        setCurrentUserById(demoUser.id);
        toast({
          title: "Login Successful",
          description: `Welcome back, ${demoUser.name}!`,
        });
        router.push('/welcome');
      } else {
         toast({
          title: "Login Failed",
          description: "Demo user not found.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      
      // The onAuthStateChanged listener in UserProvider will handle setting the user context
      toast({
        title: "Login Successful",
        description: `Welcome back!`,
      });
      router.push('/welcome');

    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = () => {
    // This is where you'll trigger the Google Sign-In flow.
    // For now, it's a placeholder.
    toast({
      title: "Coming Soon!",
      description: "Google Sign-In is being implemented.",
    });
  };

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-background p-4">
       <div className="absolute top-4 left-4">
          <Link href="/" className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors">
            <span>Back to Home</span>
          </Link>
        </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <AppLogo className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Welcome Back</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                Sign in to continue your wellness journey.
            </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
                      </Button>
                    </form>
                </Form>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>
            </CardContent>
        </Card>
         <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/onboarding" className="underline">
              Sign up
            </Link>
          </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
    return (
        <UserProvider>
            <LoginPageContent />
        </UserProvider>
    )
}
