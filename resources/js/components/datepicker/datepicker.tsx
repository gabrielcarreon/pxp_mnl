import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatDate } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const DatePicker = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date | undefined>(date);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Subscription Date
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={formatDate(date, 'MMMM dd, Y')}
          placeholder={formatDate(date, 'MMMM dd, Y')}
          className="bg-background pr-10"
          onChange={(e) => {
            const date = new Date(e.target.value);
            setDate(date);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
