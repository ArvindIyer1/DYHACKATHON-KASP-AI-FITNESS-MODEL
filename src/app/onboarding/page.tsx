import { OnboardingForm } from './onboarding-form';
import Link from 'next/link';
import { AppLogo } from '@/components/app-logo';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { UserProvider } from '@/context/user-context';

export default function OnboardingPage() {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="https://picsum.photos/seed/login-bg/1800/1200"
        alt="Fitness background"
        fill
        className="object-cover"
        data-ai-hint="fitness workout"
      />
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <div className="absolute top-4 left-4">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <AppLogo className="w-16 h-16 mx-auto text-accent mb-4" />
            <h1 className="text-3xl font-bold text-white">Join Fitness</h1>
            <p className="text-white/70 mt-2">
              Create an account to start your journey.
            </p>
          </div>
          <UserProvider>
            <OnboardingForm />
          </UserProvider>
        </div>
      </div>
    </div>
  );
}
