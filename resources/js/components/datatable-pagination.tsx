import { Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { DataTableConfig, PaginationType } from '@/types/globals';
import { router } from '@inertiajs/react';
import { JSX } from 'react';

interface DataTablePaginationProps<TData> {
  data: PaginationType<TData>;
  config: DataTableConfig;
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  data,
  config,
  table,
}: DataTablePaginationProps<TData>) {
  const params = new URLSearchParams(window.location.search);

  const visit = ({ rows, page }) => {
    router.visit(
      route(config.route, {
        ...config?.params,
        keyword: params.get(`keyword`) ?? '',
        rows: rows,
        page: page,
      }),
      {
        ...config?.options,
      },
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={String(data.per_page)}
              onValueChange={(value) =>
                visit({ rows: value, page: data.current_page })
              }
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 15, 20, 25, 30, 40, 50].map(
                  (pageSize): JSX.Element => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {data.current_page} of {data.total / data.per_page > 0 ? 1 : 0}
          </div>
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              className={cn(
                '',
                Number(data.current_page) === 1
                  ? 'pointer-events-none text-gray-400'
                  : '',
              )}
              onClick={() => visit({ rows: data.per_page, page: 1 })}
            >
              <ChevronsLeft />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              className={cn(
                '',
                Number(data.current_page) === 1
                  ? 'pointer-events-none text-gray-400'
                  : '',
              )}
              onClick={() =>
                visit({
                  rows: data.per_page,
                  page: Number(data.current_page) - 1,
                })
              }
            >
              <ChevronLeft />
            </PaginationLink>
          </PaginationItem>
          {/*{pages.map((page) => (*/}
          {/*  <PaginationItem key={page.value} className="cursor-pointer">*/}
          {/*    <PaginationLink*/}
          {/*      onClick={() => paginate(page.link, page.value)}*/}
          {/*      isActive={page.value === data?.current_page}*/}
          {/*    >*/}
          {/*      {page.label}*/}
          {/*    </PaginationLink>*/}
          {/*  </PaginationItem>*/}
          {/*))}*/}
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              onClick={() =>
                visit({
                  rows: data.per_page,
                  page: Number(data.current_page) + 1,
                })
              }
              className={cn(
                '',
                Number(data.current_page) === Number(data.last_page)
                  ? 'pointer-events-none text-gray-400'
                  : '',
              )}
            >
              <ChevronRight />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              onClick={() =>
                visit({ rows: data.per_page, page: data.last_page })
              }
              className={cn(
                '',
                Number(data.current_page) === Number(data.last_page)
                  ? 'pointer-events-none text-gray-400'
                  : '',
              )}
            >
              <ChevronsRight />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
