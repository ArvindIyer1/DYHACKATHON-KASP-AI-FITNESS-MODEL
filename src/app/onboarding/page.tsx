import { OnboardingForm } from './onboarding-form';
import { AppLogo } from '@/components/app-logo';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <AppLogo className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold font-headline">Create Your Synergy Life Profile</h1>
          <p className="text-muted-foreground mt-2">
            Tell us a bit about yourself to generate your personalized wellness plan.
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}
