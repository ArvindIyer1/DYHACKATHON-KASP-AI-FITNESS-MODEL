'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { useUser } from '@/context/user-context';
import {
  LayoutDashboard,
  PlusCircle,
  User as UserIcon,
  LogOut,
  Settings,
  Heart,
  Bell,
  Calendar,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/log', label: 'Log Activity', icon: PlusCircle },
  { href: '/dashboard/schedule', label: 'Schedule', icon: Calendar },
  { href: '/dashboard/doctors', label: 'Doctors', icon: Heart },
  { href: '/dashboard/feedback', label: 'Feedback', icon: PlusCircle },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/profile', label: 'Profile', icon: UserIcon },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, setCurrentUserById } = useUser();

  const handleLogout = () => {
    setCurrentUserById(null);
    router.push('/');
  };
  
  const getAvatarUrl = (avatarId: string) => {
    return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || '';
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }


  if (!currentUser) {
    // Or a loading skeleton
    return null;
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b-0">
        <div className="flex items-center justify-center gap-2 p-4">
            <AppLogo className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold font-headline">Synergy Life</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map(({ href, label, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <Link href={href} passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith(href) && (href !== '/dashboard' || pathname === '/dashboard')}
                  tooltip={{ children: label, side: 'right' }}
                >
                  <Icon />
                  <span>{label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-2 border-t-0 mt-auto">
        <SidebarMenu>
            <SidebarMenuItem>
                 <SidebarMenuButton
                    onClick={() => router.push('/dashboard/settings')}
                    tooltip={{ children: 'Settings', side: 'right' }}
                    isActive={pathname.startsWith('/dashboard/settings')}
                >
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip={{ children: 'Logout', side: 'right' }}
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
