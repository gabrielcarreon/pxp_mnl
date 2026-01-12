import AppLayout from '@/layouts/app-layout';
import { bookings as bookingsRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Head } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { CalendarHeader } from './calendar-header';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Calendar',
    href: bookingsRoute().url,
  },
];

export default function Calendar({ month_booking, month, year }) {
  const calendarRef = useRef(null);

  useEffect(() => {
    calendarRef.current?.getApi().gotoDate(new Date(year, Number(month), 0));
  }, [year, month]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Calendar" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div>
          <h2 className="text-2xl font-bold">Calendar</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Track camera rental schedules.
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
      </div>
    </AppLayout>
  );
}
