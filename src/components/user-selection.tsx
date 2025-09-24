"use client";

import { useUser } from '@/context/user-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UserSelection() {
  const { users, setCurrentUserById } = useUser();
  const router = useRouter();

  const handleUserSelect = (userId: string) => {
    setCurrentUserById(userId);
    router.push('/dashboard');
  };

  const handleNewUser = () => {
    router.push('/onboarding');
  };
  
  const getAvatarUrl = (avatarId: string) => {
    return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || PlaceHolderImages.find(img => img.id === 'new-user')?.imageUrl || '';
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => handleUserSelect(user.id)}
            className="group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
          >
            <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary">
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
                </div>
                <p className="font-semibold text-lg py-3 w-full text-center bg-card">
                  {user.name}
                </p>
              </CardContent>
            </Card>
          </button>
        ))}
        <button
          onClick={handleNewUser}
          className="group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
        >
          <Card className="h-full border-dashed border-2 hover:border-solid hover:border-primary transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
            <CardContent className="p-4 flex flex-col items-center justify-center h-full gap-2">
              <PlusCircle className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
              <p className="font-semibold text-lg text-muted-foreground group-hover:text-primary transition-colors">
                New Profile
              </p>
            </CardContent>
          </Card>
        </button>
      </div>
    </div>
  );
}
