
"use client";

import { useUser } from '@/context/user-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { Separator } from '@/components/ui/separator';
import { Settings, User, Heart, Smartphone, SunMoon, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const { currentUser, loading, setCurrentUserById } = useUser();
  const { setTheme, theme } = useTheme();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);


  if (loading || !currentUser) {
    return (
        <div className="flex h-96 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    );
  }
  
  const handleLogout = () => {
    setCurrentUserById(null);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would have state management for form fields
    // and then call updateCurrentUser.
    toast({
      title: 'Settings Saved',
      description: 'Your changes have been successfully saved.',
    });
  };
  
  const handleSync = () => {
    toast({
      title: 'Syncing Data...',
      description: 'Your offline data is being uploaded to the server.',
    });
    setTimeout(() => {
      toast({
        title: 'Sync Complete!',
        description: 'Your data is now up to date.',
      });
    }, 2000);
  };
  
  const handleChangePassword = () => {
      toast({
        title: 'Password Change',
        description: 'In a real app, this would open a secure password change form.',
      });
  }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Settings className="w-8 h-8" />
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account, preferences, and app settings.
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> Profile Settings</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveChanges} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={currentUser.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={currentUser.email} disabled />
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="e.g., 28" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                        <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex justify-between items-center pt-4">
                <Button type="submit">Save Changes</Button>
                <div>
                     <Button variant="outline" onClick={handleChangePassword} className="mr-2">Change Password</Button>
                     <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Fitness Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Heart className="w-5 h-5" /> Fitness Preferences</CardTitle>
          <CardDescription>Tailor your fitness plan to your lifestyle.</CardDescription>
        </CardHeader>
        <CardContent>
           <form onSubmit={handleSaveChanges} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="space-y-2">
                <Label htmlFor="fitness-goal">Fitness Goal</Label>
                <Select defaultValue="strength">
                  <SelectTrigger id="fitness-goal"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight_loss">Weight Loss</SelectItem>
                    <SelectItem value="strength">Strength</SelectItem>
                    <SelectItem value="flexibility">Flexibility</SelectItem>
                    <SelectItem value="general_wellness">General Wellness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workout-time">Preferred Workout Time</Label>
                <Select defaultValue="any">
                  <SelectTrigger id="workout-time"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                     <SelectItem value="any">Any time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select defaultValue={currentUser.experienceLevel.toLowerCase()}>
                  <SelectTrigger id="difficulty"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
             <div className="flex justify-start pt-4">
                <Button type="submit">Save Preferences</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* App Settings */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Smartphone className="w-5 h-5" /> App Settings</CardTitle>
            <CardDescription>Manage offline data and other app functions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
              <div className="space-y-2">
                  <Label>Offline Mode</Label>
                  <p className="text-sm text-muted-foreground">You have 3 unsynced activities.</p>
                  <Button onClick={handleSync}>Sync Now</Button>
              </div>
              <Separator />
               <div className="space-y-4">
                <Label className="flex items-center gap-2"><SunMoon className="w-4 h-4" /> Theme & Accessibility</Label>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <p className="text-sm">Dark Mode</p>
                    <Switch
                        checked={theme === 'dark'}
                        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="font-size">Font Size</Label>
                    <Select defaultValue="medium">
                    <SelectTrigger id="font-size"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
              </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" /> Notifications</CardTitle>
             <CardDescription>Control what notifications you receive.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <p className="text-sm font-medium">Workout Reminders</p>
                    <p className="text-sm text-muted-foreground">Get notified before a scheduled workout.</p>
                </div>
                <Switch defaultChecked />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <p className="text-sm font-medium">Weekly Progress</p>
                    <p className="text-sm text-muted-foreground">Receive a summary of your week.</p>
                </div>
                <Switch defaultChecked />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <p className="text-sm font-medium">Achievement Unlocked</p>
                    <p className="text-sm text-muted-foreground">Celebrate when you earn a new badge.</p>
                </div>
                <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Support & Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" /> Support & Contact
            </CardTitle>
            <CardDescription>Need help? We're here for you 24/7</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">📞 Toll-Free Support</p>
                  <p className="text-lg font-bold text-primary">1-800-FIT-KASP</p>
                  <p className="text-sm text-muted-foreground">(1-800-348-5277)</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Available 24/7 • Free from anywhere in the US & Canada
              </div>
            </div>
            
            <div className="rounded-lg border p-4 space-y-2">
              <p className="text-sm font-medium">💬 Live Chat Support</p>
              <p className="text-sm text-muted-foreground">Get instant help from our AI coaches</p>
              <Button variant="outline" size="sm" className="w-full">
                Start Chat
              </Button>
            </div>

            <div className="rounded-lg border p-4 space-y-2">
              <p className="text-sm font-medium">📧 Email Support</p>
              <p className="text-sm text-muted-foreground">support@kaspfitness.com</p>
              <p className="text-xs text-muted-foreground">Response within 24 hours</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
