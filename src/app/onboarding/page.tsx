
import { OnboardingForm } from './onboarding-form';
import Link from 'next/link';
import { AppLogo } from '@/components/app-logo';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { UserProvider } from '@/context/user-context';

export default function OnboardingPage() {
  return (
    <div className="relative min-h-screen w-full bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="absolute top-4 left-4">
          <Link href="/login/gender" className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Gender Selection</span>
          </Link>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <AppLogo className="w-16 h-16 mx-auto text-primary mb-4" />
            <h1 className="text-4xl font-bold font-headline text-foreground">Welcome to Synergy Life</h1>
            <p className="text-muted-foreground mt-2">
              Let's create your personalized wellness plan.
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
