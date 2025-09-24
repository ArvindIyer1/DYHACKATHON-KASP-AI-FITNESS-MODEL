import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { UserProvider } from '@/context/user-context';
import Image from 'next/image';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="relative min-h-screen w-full bg-background">
        <Image
          src="https://picsum.photos/seed/dashboard-bg/1920/1080"
          alt="Abstract background"
          fill
          className="object-cover opacity-10"
          data-ai-hint="abstract texture"
        />
        <div className="relative z-10">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <AppHeader />
              <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </UserProvider>
  );
}
