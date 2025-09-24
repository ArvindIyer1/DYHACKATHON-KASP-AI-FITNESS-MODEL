
"use client";

import { useUser } from '@/context/user-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export function UserSelection() {
  const { users, setCurrentUserById } = useUser();
  const router = useRouter();

  const handleUserSelect = (userId: string) => {
    setCurrentUserById(userId);
    router.push('/dashboard');
  };
  
  const getAvatarUrl = (avatarId: string) => {
    return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || PlaceHolderImages.find(img => img.id === 'new-user')?.imageUrl || '';
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => handleUserSelect(user.id)}
            className="group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          >
            <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary bg-card">
              <CardContent className="p-0 flex flex-col items-center">
                <div className="relative w-full aspect-[4/5]">
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
          <button
            onClick={() => router.push('/login/gender')}
            className="group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
            >
             <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary bg-card h-full">
                <CardContent className="p-0 flex flex-col items-center justify-center h-full gap-4">
                    <PlusCircle className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" />
                    <p className="font-semibold text-lg text-muted-foreground group-hover:text-primary transition-colors">
                    Create New Profile
                    </p>
                </CardContent>
            </Card>
        </button>
      </div>
    </div>
  );
}
