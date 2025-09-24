

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AppLogo } from '@/components/app-logo';
import { UserProvider } from '@/context/user-context';
import { Dumbbell, HeartPulse, Menu, Globe, Instagram, Linkedin, Facebook, Twitter, Star } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-medium text-foreground/70 transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}

const chooseUsItems = [
  {
    icon: Dumbbell,
    title: 'Adaptive AI Planning',
    description: 'Our AI generates and adjusts your workout plan based on your progress and feedback.',
  },
  {
    icon: HeartPulse,
    title: 'Holistic Wellness',
    description: 'We focus on more than just workouts, with suggestions for rest, mindfulness, and nutrition.',
  },
  {
    icon: Star,
    title: 'Gamified Motivation',
    description: 'Stay engaged with points, streaks, and achievements that make your fitness journey fun.',
  },
];

const classes = [
  {
    id: "class-1",
    name: "Strength Training",
    imgUrl: "https://picsum.photos/seed/new-strength/600/800",
    imgHint: "strength training"
  },
   {
    id: "class-2",
    name: "Yoga & Flexibility",
    imgUrl: "https://picsum.photos/seed/yoga/600/800",
    imgHint: "yoga class"
  },
   {
    id: "class-3",
    name: "Cardio Endurance",
    imgUrl: "https://picsum.photos/seed/cardio/600/800",
    imgHint: "running"
  },
   {
    id: "class-4",
    name: "Wellness & Recovery",
    imgUrl: "https://picsum.photos/seed/wellness/600/800",
    imgHint: "meditation"
  },
];

const faqItems = [
  {
    question: "How does the AI personalize my workout plan?",
    answer: "Our AI uses your initial goals, experience level, and preferred activities. As you log workouts, it adapts by analyzing your performance, consistency, and feedback to adjust difficulty and suggest new exercises."
  },
  {
    question: "Can I use the app offline?",
    answer: "Absolutely! Synergy Life is designed to be offline-first. You can log workouts, view your plan, and track progress without an internet connection. Your data will automatically sync once you're back online."
  },
  {
    question: "What is gamification in Synergy Life?",
    answer: "We use points, streaks, and achievement badges to make your fitness journey more engaging and fun. It's a great way to stay motivated and celebrate your milestones."
  },
  {
    question: "Can I share my progress with friends or family?",
    answer: "Yes, our multi-user groups feature allows you to share your plan and create a friendly competition with a group leaderboard. It's perfect for keeping each other accountable."
  }
];


export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-3" prefetch={false}>
            <AppLogo className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl font-headline">
              Synergy Life
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#classes">Programs</NavLink>
            <NavLink href="#about">About</NavLink>
          </nav>
           <div className="flex items-center gap-2">
            <ThemeToggle />
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>हिन्दी</DropdownMenuItem>
                <DropdownMenuItem>मराठी</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild variant="ghost" className="hidden md:flex">
                <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/onboarding">Get Started</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium mt-10">
                  <NavLink href="#features">Features</NavLink>
                  <NavLink href="#classes">Programs</NavLink>
                  <NavLink href="#about">About</NavLink>
                   <NavLink href="/login">Log In</NavLink>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative h-[85vh] min-h-[600px] w-full">
          <div className="absolute inset-0">
            <Image
              src="https://picsum.photos/seed/hero-gym-modern/1800/1200"
              alt="People in a modern gym"
              fill
              className="object-cover brightness-50"
              priority
              data-ai-hint="gym fitness"
            />
          </div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl uppercase font-headline">
              Your Wellness, Reimagined
            </h1>
            <p className="mt-4 max-w-3xl text-lg md:text-xl text-white/80">
              Discover personalized, adaptive fitness plans that evolve with you. Synergy Life is your AI partner for a healthier, stronger life.
            </p>
            <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="/onboarding">Start Your Journey</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase font-headline">Why Synergy Life?</h2>
              <p className="mt-4 text-primary md:text-xl font-semibold">A Smarter Way to Stay Fit</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {chooseUsItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-md">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold font-headline">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="classes" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase font-headline">Our Programs</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">Find the perfect plan to match your goals.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {classes.map((cls) => (
                <Link key={cls.id} href="#" className="group relative block h-96 overflow-hidden rounded-lg shadow-lg">
                    <Image src={cls.imgUrl} alt={cls.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={cls.imgHint} />
                    <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                        <h3 className="text-xl font-bold text-white uppercase font-headline">{cls.name}</h3>
                    </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                 <Image
                    src="https://picsum.photos/seed/about-us-image/800/600"
                    alt="Gym interior"
                    fill
                    className="object-cover"
                    data-ai-hint="gym interior"
                  />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase font-headline">
                  About Synergy Life
                </h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                  We believe that fitness is a personal journey, not a one-size-fits-all destination. Synergy Life was born from a desire to make truly personalized wellness accessible to everyone, everywhere—regardless of connectivity. Our AI-powered platform combines cutting-edge technology with proven fitness principles to create a plan that's as unique as you are.
                </p>
                <Button size="lg" className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <Link href="/onboarding">Join the Movement</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase font-headline">Frequently Asked Questions</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">Have questions? We've got answers.</p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-semibold">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-secondary-foreground border-t">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <AppLogo className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl font-headline">Synergy Life</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">Your personalized, adaptive AI fitness coach for a healthier life.</p>
               <div className="flex space-x-4 mt-6">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                 <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg font-headline mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link href="#classes" className="text-muted-foreground hover:text-primary">Programs</Link></li>
                <li><Link href="#faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
                <li><Link href="/onboarding" className="text-muted-foreground hover:text-primary">Get Started</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg font-headline mb-4">About</h3>
               <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
             <div>
              <h3 className="font-bold text-lg font-headline mb-4">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-3">Get the latest fitness tips and app updates.</p>
              <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="bg-background/50 flex-1" />
                <Button type="submit" variant="secondary">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Synergy Life. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

    

    

