import { MdOutlineCamera } from 'react-icons/md';

export const Navigation = () => (
  <nav className="bg-surface-light/90 dark:bg-surface-dark/90 border-border-light dark:border-border-dark sticky top-0 z-50 border-b backdrop-blur-md">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex shrink-0 cursor-pointer items-center gap-2">
          <MdOutlineCamera className="size-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary dark:text-white">
            Picture Perfect MNL
          </span>
        </div>
        <div className="hidden items-center space-x-8 md:flex">
          <a
            className="text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
            href="#"
          >
            Inventory
          </a>
          <a
            className="text-sm font-medium text-slate-700 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
            href="#"
          >
            How it Works
          </a>
        </div>
      </div>
    </div>
  </nav>
);
