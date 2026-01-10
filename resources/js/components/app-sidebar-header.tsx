import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { MdOutlineAdd, MdOutlineNotifications } from 'react-icons/md';
import { Searchbar } from './searchbar';
import { Button } from './ui/button';

export function AppSidebarHeader({
  breadcrumbs = [],
}: {
  breadcrumbs?: BreadcrumbItemType[];
}) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex w-full justify-between gap-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
        <Searchbar
          styles={{
            wrapper: 'max-w-1/3',
          }}
          fn={(keyword) => {
            console.log(keyword);
          }}
        />
        <div className="flex items-center justify-end gap-2">
          <MdOutlineNotifications className="size-5" />
          <Button size="sm">
            <MdOutlineAdd />
            New Booking
          </Button>
        </div>
      </div>
    </header>
  );
}
