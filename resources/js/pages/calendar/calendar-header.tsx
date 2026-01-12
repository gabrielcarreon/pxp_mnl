import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { calendar } from '@/routes';
import { router, usePage } from '@inertiajs/react';
import { formatDate } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';

const months = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
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
          value={String(month)}
          onValueChange={(e) => {
            router.visit(calendar.url(), {
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
              <SelectItem key={String(item.value)} value={String(item.value)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={String(year)}
          onValueChange={(e) => {
            router.visit(calendar.url(), {
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
              router.visit(calendar.url(), {
                preserveState: true,
                preserveScroll: true,
                data: {
                  month: 12,
                  year: Number(year) - 1,
                },
              });
            } else {
              router.visit(calendar.url(), {
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
              router.visit(calendar.url(), {
                preserveState: true,
                preserveScroll: true,
                data: {
                  month: 1,
                  year: Number(year) + 1,
                },
              });
            } else {
              router.visit(calendar.url(), {
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
