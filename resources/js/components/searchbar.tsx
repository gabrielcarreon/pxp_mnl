import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { debounce } from 'lodash';
import { JSX, useMemo, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';

type Searchbar = {
  styles?: {
    wrapper?: string;
  };
  fn: (keyword: string) => void;
};
export const Searchbar = ({ styles, fn }: Searchbar): JSX.Element => {
  const params = new URLSearchParams(window.location.search);
  const [keyword, setKeyword] = useState<string>(params.get('keyword') ?? '');
  const debouncedSearch = useMemo(() => debounce(fn, 400), [fn]);

  return (
    <div
      className={cn(
        'flex h-9 w-full items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background',
        'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        styles?.wrapper,
      )}
    >
      <MdOutlineSearch />
      <Input
        className="border-none shadow-none focus-visible:ring-0 focus-visible:outline-none"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          debouncedSearch(e.target.value);
        }}
      />
    </div>
  );
};
