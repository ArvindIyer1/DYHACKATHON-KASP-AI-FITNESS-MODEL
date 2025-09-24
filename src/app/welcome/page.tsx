
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppLogo } from '@/components/app-logo';

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [router]);

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-background">
      <div className="flex animate-pulse items-center gap-4">
        <AppLogo className="h-20 w-20" />
        <span className="text-5xl font-bold font-headline">Synergy Life</span>
      </div>
    </div>
  );
}
