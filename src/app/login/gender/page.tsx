
"use client";

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { AppLogo } from '@/components/app-logo';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const genderProfiles = [
  {
    id: 'female',
    name: 'Female',
    avatarId: 'new-user-female',
  },
  {
    id: 'male',
    name: 'Male',
    avatarId: 'new-user-male',
  }
]

export default function GenderSelectionPage() {
  const router = useRouter();

  const handleGenderSelect = (gender: string) => {
    router.push(`/onboarding?gender=${gender}`);
  };
  
  const getAvatarUrl = (avatarId: string) => {
    return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || PlaceHolderImages.find(img => img.id === 'new-user')?.imageUrl || '';
  }

  return (
     <div className="relative flex min-h-dvh flex-col items-center justify-center bg-background p-4">
        <div className="absolute top-4 left-4">
          <Link href="/login" className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Profiles</span>
          </Link>
        </div>
        <div className="text-center mb-8">
          <AppLogo className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Choose a Profile Type</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
              This helps us personalize your starting avatar and plan.
          </p>
        </div>
        <div className="w-full max-w-2xl">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                {genderProfiles.map((profile) => (
                <button
                    key={profile.id}
                    onClick={() => handleGenderSelect(profile.id)}
                    className="group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                >
                    <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary bg-card">
                    <CardContent className="p-0 flex flex-col items-center">
                        <div className="relative w-full aspect-square">
                        <Image
                            src={getAvatarUrl(profile.avatarId)}
                            alt={`Avatar for ${profile.name}`}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            data-ai-hint="person portrait"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                        <p className="font-semibold text-lg py-3 w-full text-center">
                        {profile.name}
                        </p>
                    </CardContent>
                    </Card>
                </button>
                ))}
            </div>
        </div>
    </div>
  );
}
