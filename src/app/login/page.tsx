
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
import { GoogleIcon } from "@/components/google-icon";
import { signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator";


const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

function LoginPageContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { users, setCurrentUserById, login } = useUser();
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
    
    try {
      const loginSuccess = await login(values.email, values.password);
      
      if (loginSuccess) {
        const user = users.find(u => u.email === values.email);
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user?.name || 'User'}!`,
        });
        router.push('/welcome');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signIn('google', {
        callbackUrl: '/dashboard',
        redirect: false,
      });
      
      if (result?.error) {
        toast({
          title: "Sign-in Failed",
          description: "Failed to sign in with Google. Please try again.",
          variant: "destructive",
        });
      } else if (result?.ok) {
        toast({
          title: "Success!",
          description: "Successfully signed in with Google.",
        });
        router.push('/dashboard');
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({
        title: "Sign-in Failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
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
                <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isGoogleLoading}>
                  {isGoogleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <GoogleIcon className="mr-2 h-4 w-4" />
                  )}
                  {isGoogleLoading ? "Signing in..." : "Sign in with Google"}
                </Button>
            </CardContent>
        </Card>
         <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/onboarding" className="underline">
              Sign up
            </Link>
          </div>
          
          {/* Support Section */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border text-center">
            <p className="text-sm font-medium mb-2">Need Help? We're Here 24/7</p>
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-center text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                📞 <span className="font-medium">1-800-FIT-KASP</span>
              </div>
              <div className="hidden sm:block">•</div>
              <div className="flex items-center gap-1">
                📧 <span>support@kaspfitness.com</span>
              </div>
            </div>
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
