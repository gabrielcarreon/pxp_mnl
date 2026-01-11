import { DataTable } from '@/components/datatable';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import AppLayout from '@/layouts/app-layout';
import { bookings as bookingsRoute } from '@/routes';
import { destroy, edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { type BreadcrumbItem } from '@/types';
import { Season } from '@/types/globals';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import FullCalendar from '@fullcalendar/react';
import { Head, Link, router } from '@inertiajs/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { CalendarHeader } from './calendar-header';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Booking',
    href: bookingsRoute().url,
  },
];

export default function Booking({ bookings, month_booking, month, year }) {
  const calendarRef = useRef(null);
  const confirm = useConfirm();
  const columns: ColumnDef<Season>[] = [
    {
      header: 'Season Name',
      accessorKey: 'season_name',
    },
    {
      header: 'Year',
      accessorKey: 'year',
      cell: ({ row }) => <span>{row.original.year}</span>,
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <Link
                href={show(row.original.id)}
                className="flex w-full items-center gap-2"
                prefetch
              >
                <Eye className="h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link
                href={edit(row.original.id)}
                className="align-left flex w-full items-center gap-2"
                prefetch
              >
                <Edit className="h-4 w-4" />
                Edit Season
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onSelect={(e) => {
                e.preventDefault();
                confirm.setConfig({
                  variant: 'danger',
                  title: 'Delete Season?',
                  message: `Are you sure you want to delete "${row.original.season_name}"? This action cannot be undone.`,
                  confirmFn: () => {
                    const destroyRoute = destroy(row.original.id);
                    router.delete(destroyRoute, {
                      preserveScroll: true,
                    });
                    confirm.reset();
                  },
                });
                confirm.setOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
              Delete Season
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  useEffect(() => {
    calendarRef.current?.getApi().gotoDate(new Date(year, month, 0));
  }, [year, month]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Booking" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div>
          <h2 className="text-2xl font-bold">Booking Management</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Manage, track, and approve camera rentals.
          </p>
        </div>
        <div>
          <CalendarHeader />
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            headerToolbar={false}
            events={month_booking}
          />
        </div>
        <div>
          <DataTable
            config={{
              route: bookingsRoute,
            }}
            columns={columns}
            data={bookings}
          />
        </div>
      </div>
    </AppLayout>
  );
}
