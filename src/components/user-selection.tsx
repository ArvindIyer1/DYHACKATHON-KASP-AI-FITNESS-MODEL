"use client";

import { useUser } from '@/context/user-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

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

export function UserSelection() {
  const { setCurrentUserById } = useUser();
  const router = useRouter();

  const handleUserSelect = (userId: string) => {
    // This would ideally set a gender preference before onboarding
    router.push('/onboarding');
  };
  
  const getAvatarUrl = (avatarId: string) => {
    return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || PlaceHolderImages.find(img => img.id === 'new-user')?.imageUrl || '';
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
        {genderProfiles.map((user) => (
          <button
            key={user.id}
            onClick={() => handleUserSelect(user.id)}
            className="group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          >
            <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary bg-card">
              <CardContent className="p-0 flex flex-col items-center">
                <div className="relative w-full aspect-square">
                  <Image
                    src={getAvatarUrl(user.avatarId)}
                    alt={`Avatar for ${user.name}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    data-ai-hint="person portrait"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <p className="font-semibold text-lg py-3 w-full text-center">
                  {user.name}
                </p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
