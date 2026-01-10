import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
  MdOutlineCalendarMonth,
  MdOutlineSearch,
  MdOutlineVideocam,
} from 'react-icons/md';
import { Navigation } from './public/navigation';

export default function Welcome({
  canRegister = true,
}: {
  canRegister?: boolean;
}) {
  const { auth } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Welcome">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 antialiased dark:text-white">
        <Navigation />
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
          <div className="dark:from-background-dark dark:to-surface-dark absolute inset-0 -z-10 bg-linear-to-br from-blue-50 to-white"></div>
          <div className="absolute top-20 right-0 -z-10 h-150 w-150 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -z-10 h-100 w-100 rounded-full bg-purple-500/5 blur-3xl"></div>
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="mb-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-7xl dark:text-white">
              Rent the Perfect Gear <br className="hidden sm:block" /> for Your
              Next Shoot
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-400">
              Rent from a carefully selected set of professional cameras and
              essential equipment. Tested, maintained, and ready to roll.
            </p>
            <div className="dark:bg-surface-dark dark:border-border-dark mx-auto flex max-w-4xl flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/50 md:flex-row dark:shadow-black/50">
              <div className="group relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <MdOutlineVideocam className="size-6 text-slate-400 group-focus-within:text-primary" />
                </div>
                <input
                  className="dark:bg-background-dark dark:focus:bg-surface-dark block w-full rounded-xl border-transparent bg-slate-50 py-4 pr-4 pl-12 font-medium text-slate-900 placeholder-slate-500 transition-colors focus:border-primary focus:bg-white focus:ring-0 dark:text-white"
                  placeholder="What are you looking for? (e.g. Sony A7S III)"
                  type="text"
                />
              </div>
              <div className="group relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <MdOutlineCalendarMonth className="size-6 text-slate-400 group-focus-within:text-primary" />
                </div>
                <input
                  className="dark:bg-background-dark dark:focus:bg-surface-dark block w-full rounded-xl border-transparent bg-slate-50 py-4 pr-4 pl-12 font-medium text-slate-900 placeholder-slate-500 transition-colors focus:border-primary focus:bg-white focus:ring-0 dark:text-white"
                  placeholder="Select Dates"
                  type="text"
                />
              </div>
              <button className="hover:bg-primary-dark flex items-center justify-center gap-4 rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-md transition-all">
                <MdOutlineSearch className="size-6 text-white group-focus-within:text-primary" />
                Search
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
