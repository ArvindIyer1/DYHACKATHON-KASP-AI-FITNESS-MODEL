
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
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { useUser } from '@/context/user-context';
import {
  LayoutDashboard,
  PlusCircle,
  User as UserIcon,
  LogOut,
  Settings,
  Calendar,
  BarChart3,
  MessageSquareQuestion,
} from 'lucide-react';

const coreMenuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/schedule', label: 'Schedule', icon: Calendar },
  { href: '/dashboard/progress', label: 'Progress', icon: BarChart3 },
  { href: '/dashboard/log', label: 'Log Activity', icon: PlusCircle },
];

const userMenuItems = [
    { href: '/dashboard/profile', label: 'Profile', icon: UserIcon },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const helpMenuItems = [
    { href: '/dashboard/feedback', label: 'Feedback', icon: MessageSquareQuestion },
];


export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setCurrentUserById } = useUser();

  const handleLogout = () => {
    setCurrentUserById(null);
    router.push('/');
  };
  
  const isLinkActive = (href: string) => {
    return pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
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
        <SidebarGroup>
            <SidebarGroupLabel>Core</SidebarGroupLabel>
            <SidebarMenu>
            {coreMenuItems.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                <Link href={href} passHref>
                    <SidebarMenuButton
                    isActive={isLinkActive(href)}
                    tooltip={{ children: label, side: 'right' }}
                    >
                    <Icon />
                    <span>{label}</span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
            <SidebarGroupLabel>User</SidebarGroupLabel>
             <SidebarMenu>
                {userMenuItems.map(({ href, label, icon: Icon }) => (
                    <SidebarMenuItem key={href}>
                    <Link href={href} passHref>
                        <SidebarMenuButton
                        isActive={isLinkActive(href)}
                        tooltip={{ children: label, side: 'right' }}
                        >
                        <Icon />
                        <span>{label}</span>
                        </SidebarMenuButton>
                    </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>

         <SidebarSeparator />

        <SidebarGroup>
            <SidebarGroupLabel>Help</SidebarGroupLabel>
             <SidebarMenu>
                {helpMenuItems.map(({ href, label, icon: Icon }) => (
                    <SidebarMenuItem key={href}>
                    <Link href={href} passHref>
                        <SidebarMenuButton
                        isActive={isLinkActive(href)}
                        tooltip={{ children: label, side: 'right' }}
                        >
                        <Icon />
                        <span>{label}</span>
                        </SidebarMenuButton>
                    </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
      
      <SidebarFooter className="p-2 border-t-0 mt-auto">
        <SidebarMenu>
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
