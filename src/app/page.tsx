import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AppLogo } from '@/components/app-logo';
import { UserProvider } from '@/context/user-context';
import { Dumbbell, Utensils, HeartPulse, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserSelection } from '@/components/user-selection';


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
    title: 'Modern Equipment',
    description: 'Our gym is equipped with the latest and greatest fitness equipment to help you reach your goals.',
  },
  {
    icon: Utensils,
    title: 'Healthy Nutrition Plan',
    description: 'Our nutritionists will create a personalized meal plan to complement your workout routine.',
  },
  {
    icon: HeartPulse,
    title: 'Proffessional Training Plan',
    description: 'Our certified trainers will design a workout plan tailored to your needs and abilities.',
  },
];

const classes = [
  {
    id: "class-1",
    name: "Strength Training",
    imgUrl: "https://picsum.photos/seed/strength/600/800",
    imgHint: "strength training"
  },
   {
    id: "class-2",
    name: "Basic Yoga",
    imgUrl: "https://picsum.photos/seed/yoga/600/800",
    imgHint: "yoga class"
  },
   {
    id: "class-3",
    name: "Body Building",
    imgUrl: "https://picsum.photos/seed/bodybuilding/600/800",
    imgHint: "bodybuilding"
  },
   {
    id: "class-4",
    name: "WeightLifting",
    imgUrl: "https://picsum.photos/seed/weightlifting/600/800",
    imgHint: "weightlifting"
  },
]


export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <AppLogo className="h-8 w-8 text-accent" />
            <span className="font-bold text-xl uppercase tracking-wider">
              Fitness
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="#">Home</NavLink>
            <NavLink href="#about">About Us</NavLink>
            <NavLink href="#classes">Classes</NavLink>
            <NavLink href="#">Services</NavLink>
            <NavLink href="#">Our Team</NavLink>
            <NavLink href="#">Contact</NavLink>
          </nav>
           <div className="flex items-center gap-2">
            <Button asChild variant="secondary" className="hidden md:flex bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/onboarding">Sign Up</Link>
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
                  <NavLink href="#">Home</NavLink>
                  <NavLink href="#about">About Us</NavLink>
                  <NavLink href="#classes">Classes</NavLink>
                  <NavLink href="#">Services</NavLink>
                  <NavLink href="#">Our Team</NavLink>
                  <NavLink href="#">Contact</NavLink>
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
              src="https://picsum.photos/seed/hero-workout/1800/1200"
              alt="Person working out"
              fill
              className="object-cover"
              priority
              data-ai-hint="fitness workout"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground px-4">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl uppercase">
              It&apos;s all about what you can achieve
            </h1>
            <p className="mt-4 max-w-3xl text-lg md:text-xl">
              Empower yourself to make the changes you need to make.
            </p>
            <Button size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <Link href="/onboarding">Get Started</Link>
            </Button>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase">
                  Welcome to Fitness
                </h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                  We are a premier fitness facility dedicated to helping you achieve your health and wellness goals. Our state-of-the-art gym, expert trainers, and diverse class offerings provide an unparalleled fitness experience.
                </p>
                <p className="mt-4 text-muted-foreground md:text-lg">
                  Whether you&apos;re a beginner or a seasoned athlete, we have everything you need to succeed on your fitness journey.
                </p>
                <Button size="lg" className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                    <Link href="#">Learn More</Link>
                </Button>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                 <Image
                    src="https://picsum.photos/seed/about-us-image/800/600"
                    alt="Gym interior"
                    fill
                    className="object-cover"
                    data-ai-hint="gym interior"
                  />
              </div>
            </div>
          </div>
        </section>

        <section id="why-choose-us" className="py-16 md:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase">Why Choose Us?</h2>
              <p className="mt-4 text-accent md:text-xl font-semibold">Push Your Limits Forward</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {chooseUsItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="classes" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl uppercase">Our Classes</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">What We Can Offer</p>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {classes.map((cls) => (
                <Link key={cls.id} href="#" className="group relative block h-96 overflow-hidden rounded-lg">
                    <Image src={cls.imgUrl} alt={cls.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={cls.imgHint} />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex items-end p-4">
                        <h3 className="text-xl font-bold text-white uppercase">{cls.name}</h3>
                    </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

         <section id="login" className="py-16 md:py-24 border-t">
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

      </main>

      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Fitness. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
