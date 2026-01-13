import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';
import { bookings as bookingsRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Head } from '@inertiajs/react';
import { formatDate } from 'date-fns';
import { useContext, useEffect, useRef } from 'react';
import { BookingSheet } from './booking-sheet';
import { CalendarHeader } from './calendar-header';
import { SheetContext } from './sheet-context';
import { SheetProvider } from './sheet-provider';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Calendar',
    href: bookingsRoute().url,
  },
];

const Calendar = ({
  month_booking,
  month,
  year,
  pending_bookings,
  pending_bookings_count,
}) => {
  const calendarRef = useRef(null);
  const { setSheetOpen } = useContext(SheetContext);

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
        <div className="flex w-full gap-4">
          <Card className="w-2/3">
            <CardContent>
              <div>
                <CalendarHeader />
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin]}
                  headerToolbar={false}
                  events={month_booking}
                />
              </div>
            </CardContent>
          </Card>

          <div className="min-h-full w-1/3">
            <Card className="min-h-full">
              <CardHeader className="flex items-center gap-2 font-medium">
                Pending Bookings
                <Badge>{pending_bookings_count}</Badge>
              </CardHeader>
              <CardContent className="max-h-screen overflow-y-auto">
                {pending_bookings.map((booking) => (
                  <div
                    key={booking.id}
                    onClick={() => {
                      setSheetOpen(true);
                    }}
                    className="group mb-2 cursor-pointer"
                  >
                    <Card className="group-hover:bg-gray-100 group-hover:transition-all">
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">BK-1892</p>

                          <Badge variant="default">Pending</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {booking.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.camera.camera_name}
                        </p>
                        <p className="text-xs">
                          {formatDate(
                            new Date(booking.pickup_date),
                            'MMM d, y',
                          )}{' '}
                          →{' '}
                          {formatDate(
                            new Date(booking.dropoff_date),
                            'MMM d, y',
                          )}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <BookingSheet />
    </AppLayout>
  );
};

Calendar.layout = (page) => <SheetProvider>{page}</SheetProvider>;

export default Calendar;
