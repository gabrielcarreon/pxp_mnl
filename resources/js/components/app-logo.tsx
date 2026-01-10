export default function AppLogo() {
  return (
    <>
      <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
        <img src="https://placehold.co/200" className="rounded-full" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate text-base leading-tight font-semibold">
          Picture Perfect
        </span>
        <span className="text-sm">Admin Console</span>
      </div>
    </>
  );
}
