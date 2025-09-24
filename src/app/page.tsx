import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AppLogo } from '@/components/app-logo';
import { UserSelection } from '@/components/user-selection';
import { UserProvider } from '@/context/user-context';
import { Check, ChevronDown, Globe } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ThemeToggle } from '@/components/theme-toggle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-medium transition-colors text-foreground/60 hover:text-foreground">
      {children}
    </Link>
  );
}

const features = [
  "AI-Personalized Workout Plans",
  "Adaptive Training",
  "Gamified Progress Tracking",
  "Holistic Wellness Suggestions",
  "Community & Challenges"
];

const faqs = [
  {
    question: "What is Synergy Life?",
    answer: "Synergy Life is a next-generation wellness application that uses AI to create personalized fitness and wellness plans tailored to your goals, experience, and lifestyle."
  },
  {
    question: "How does the AI personalization work?",
    answer: "Our AI analyzes your initial onboarding data and continues to learn from your logged activities and feedback. It adapts your workout plan, suggests new exercises, and modifies your wellness routine to ensure you're always progressing."
  },
  {
    question: "Is Synergy Life suitable for beginners?",
    answer: "Absolutely! We cater to all experience levels, from complete beginners to advanced athletes. Your plan is customized to your current fitness level and will scale with you as you get stronger."
  },
  {
    question: "What if I miss a workout?",
    answer: "Life happens! Our AI is designed to be flexible. It will adjust your plan to help you get back on track without overwhelming you. You can also use the 'Adapt My Plan' feature to manually request changes."
  }
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <AppLogo className="h-8 w-8 text-primary" />
          <span className="font-bold text-lg">Synergy Life</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#faq">FAQ</NavLink>
          <NavLink href="#">About</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Login</Link>
          </Button>
          <Button asChild>
             <Link href="/onboarding">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
           <div className="absolute inset-0">
            <Image
              src="https://picsum.photos/seed/fitness-hero/1800/1200"
              alt="Person working out"
              fill
              className="object-cover"
              priority
              data-ai-hint="fitness workout"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 container px-4 md:px-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Forge Your Ultimate Self
            </h1>
            <p className="mt-4 mx-auto max-w-[700px] text-lg md:text-xl text-white/80">
              Synergy Life is your personal AI wellness coach, creating dynamic workout and wellness plans that adapt and grow with you.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/onboarding">Start Your Journey</Link>
            </Button>
          </div>
        </section>
        
        <section id="login" className="py-16 md:py-24">
            <div className="container px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Select Your Profile</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                    Or create a new one to begin your personalized fitness journey.
                </p>
                <div className="mt-8 flex justify-center">
                  <UserProvider>
                    <UserSelection />
                  </UserProvider>
                </div>
            </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Unlock Your Potential with AI</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                  Our intelligent system analyzes your goals, experience, and progress to build the perfect plan for you. Stop guessing, start achieving.
                </p>
                <ul className="mt-6 space-y-4">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
                 <Image
                    src="https://picsum.photos/seed/feature-image/800/600"
                    alt="Fitness app interface"
                    fill
                    className="object-cover"
                    data-ai-hint="app interface"
                  />
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 md:py-24">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Find answers to common questions about Synergy Life.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem value={`item-${i}`} key={i}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

      </main>

      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <AppLogo className="w-6 h-6" />
            <span>© {new Date().getFullYear()} Synergy Life. All rights reserved.</span>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
