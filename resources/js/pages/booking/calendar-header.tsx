import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { bookings } from '@/routes';
import { router, usePage } from '@inertiajs/react';
import { formatDate } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';

const months = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
];

export const CalendarHeader = () => {
  const { first_transaction, month, year } = usePage().props;

  const years = useMemo(() => {
    let yearTemp = Number(formatDate(new Date(), 'y'));
    const temp = [];
    if (!first_transaction) {
      return [yearTemp];
    }
    while (
      yearTemp >
      Number(formatDate(new Date(first_transaction.pickup_date), 'y'))
    ) {
      temp.push(String(yearTemp));
      yearTemp--;
    }
    return temp;
  }, [first_transaction]);
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <div className="flex gap-2">
        <Select
          value={month}
          onValueChange={(e) => {
            router.visit(bookings.url(), {
              preserveState: true,
              preserveScroll: true,
              data: {
                month: e,
                year: year,
              },
            });
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {months.map((item) => (
              <SelectItem key={item.value} value={String(item.value)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={String(year)}
          onValueChange={(e) => {
            router.visit(bookings.url(), {
              preserveState: true,
              preserveScroll: true,
              data: {
                year: e,
                month: month,
              },
            });
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          onClick={() => {
            if (month <= 1) {
              router.visit(bookings.url(), {
                preserveState: true,
                preserveScroll: true,
                data: {
                  month: 12,
                  year: Number(year) - 1,
                },
              });
            } else {
              router.visit(bookings.url(), {
                preserveState: true,
                preserveScroll: true,
                data: {
                  month: Number(month) - 1,
                  year: year,
                },
              });
            }
          }}
          variant="outline"
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => {
            if (month >= 12) {
              router.visit(bookings.url(), {
                preserveState: true,
                preserveScroll: true,
                data: {
                  month: 1,
                  year: Number(year) + 1,
                },
              });
            } else {
              router.visit(bookings.url(), {
                preserveState: true,
                preserveScroll: true,
                data: {
                  month: Number(month) + 1,
                  year: year,
                },
              });
            }
          }}
          variant="outline"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
