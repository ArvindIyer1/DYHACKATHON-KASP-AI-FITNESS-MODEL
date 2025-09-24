import { AppLogo } from '@/components/app-logo';
import { UserSelection } from '@/components/user-selection';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="flex flex-col items-center gap-4 mb-12 text-center">
        <AppLogo className="w-20 h-20 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
          Welcome to Synergy Life
        </h1>
        <p className="text-muted-foreground max-w-md">
          Your personalized journey to wellness starts here. Select your profile
          to continue.
        </p>
      </div>
      <UserSelection />
    </main>
  );
}
