import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function CodeVitaLogo() {
  return (
    <div className="text-2xl font-bold text-white">
      tcs CodeVita<span className="align-super text-xs">™</span>
    </div>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode, active?: boolean }) {
  return (
    <Link href={href} className={`text-sm font-medium transition-colors hover:text-primary ${active ? 'text-primary' : 'text-white'}`}>
      {children}
    </Link>
  );
}

export default function CodeVitaPage() {
  return (
    <div className="relative min-h-screen w-full bg-slate-900 text-white">
      <div className="relative z-10">
        <header className="container mx-auto flex items-center justify-between p-4">
          <CodeVitaLogo />
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="#" active>HOME</NavLink>
            <NavLink href="#">ABOUT</NavLink>
            <NavLink href="#">SAMPLE QUESTIONS</NavLink>
            <NavLink href="#">GALLERY</NavLink>
            <NavLink href="#">FAQS</NavLink>
            <NavLink href="#">SELF HELP TRIVIA</NavLink>
            <NavLink href="#">CONTACT</NavLink>
            <NavLink href="#">BLOG</NavLink>
          </nav>
          <Button>Login / Register</Button>
        </header>

        <main className="relative container mx-auto flex flex-col items-center justify-center text-center py-24 md:py-32">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            TCS CodeVita™ Season 13
          </h1>
          <p className="mt-4 text-xl md:text-2xl">Registrations Open!</p>
          <Button variant="outline" className="mt-8 bg-transparent border-primary hover:bg-primary/10 text-white">
            Register
          </Button>
        </main>
      </div>

      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/codevita-hero/1600/900"
          alt="Students collaborating over a glowing globe"
          fill
          className="object-cover"
          data-ai-hint="students coding"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/80" />
      </div>
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 md:h-32"
        style={{
          background: 'white',
          clipPath: 'path("M0,100 C150,0 350,0 500,0 S700,0 850,0 S1000,0 1000,0 L1000,100 L0,100 Z")'
        }}
      ></div>

      <div 
        className="absolute bottom-0 left-0 right-0 h-24 md:h-32"
        style={{
          transform: 'scaleX(-1)',
          background: 'white',
          clipPath: 'path("M0,100 C150,0 350,0 500,0 S700,0 850,0 S1000,0 1000,0 L1000,100 L0,100 Z")'
        }}
      ></div>

    </div>
  );
}
