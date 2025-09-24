
import { UserSelection } from '@/components/user-selection';
import { UserProvider } from '@/context/user-context';
import { AppLogo } from '@/components/app-logo';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-background p-4">
        <div className="absolute top-4 left-4">
          <Link href="/" className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
        <div className="text-center mb-8">
          <AppLogo className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Select Your Profile</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
              Or create a new one to begin your personalized fitness journey.
          </p>
        </div>
        <div className="w-full flex justify-center">
            <UserProvider>
                <UserSelection />
            </UserProvider>
        </div>
    </div>
  );
}
