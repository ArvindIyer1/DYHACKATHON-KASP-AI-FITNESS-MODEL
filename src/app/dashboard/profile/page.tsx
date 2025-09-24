"use client";

import { useUser } from '@/context/user-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Award, Flame, Star, Target, Dumbbell } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { currentUser } = useUser();

  useEffect(() => {
    if (!currentUser) {
      redirect('/');
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }
  
  const getAvatarUrl = (avatarId: string) => {
    return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || '';
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <Avatar className="h-24 w-24 border-4 border-primary">
          <AvatarImage src={getAvatarUrl(currentUser.avatarId)} alt={currentUser.name} data-ai-hint="person portrait" />
          <AvatarFallback className="text-3xl">{getInitials(currentUser.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold font-headline">{currentUser.name}</h1>
          <p className="text-muted-foreground">{currentUser.email}</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Synergy Points</CardTitle>
            <Star className="h-4 w-4 text-accent" fill="currentColor" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.points.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" fill="currentColor" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.streak} days</div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Experience Level</CardTitle>
            <Dumbbell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.experienceLevel}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5" /> Fitness Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{currentUser.fitnessGoals}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Award className="w-5 h-5" /> Achievements</CardTitle>
          <CardDescription>Badges you've earned on your wellness journey.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {currentUser.achievements.length > 0 ? (
            currentUser.achievements.map((ach, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-1 px-3 bg-accent/20 text-accent-foreground border-accent">
                {ach}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Start logging activities to earn achievements!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
