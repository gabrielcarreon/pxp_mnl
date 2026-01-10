import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useActiveUrl } from '@/hooks/use-active-url';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const { urlIsActive } = useActiveUrl();

  return (
    <SidebarGroup className="mt-4 px-2 py-0">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              className="h-9"
              asChild
              isActive={urlIsActive(item.href)}
              tooltip={{ children: item.title }}
            >
              <Link href={item.href} prefetch>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
