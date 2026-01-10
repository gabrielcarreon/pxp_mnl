import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
  MdBarChart,
  MdCalendarMonth,
  MdDashboard,
  MdOutlineInventory2,
  MdShare,
} from 'react-icons/md';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: dashboard(),
    icon: MdDashboard,
  },
  {
    title: 'Inventory',
    href: dashboard(),
    icon: MdOutlineInventory2,
  },
  {
    title: 'Bookings',
    href: dashboard(),
    icon: MdCalendarMonth,
  },
  {
    title: 'Social Media',
    href: dashboard(),
    icon: MdShare,
  },
  {
    title: 'Reports',
    href: dashboard(),
    icon: MdBarChart,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboard()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
