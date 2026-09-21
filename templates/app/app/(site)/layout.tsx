// The other shell: no sidebar, a top bar and a wide column. For anything a reader sees before they
// sign in, such as a landing page, a microsite or an event page. `datum-ui new --kind site` keeps
// this one and drops the app shell.
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/site.config';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/brand/datum-mark.png" alt="" width={22} height={22} className="size-[22px] rounded-[6px]" />
            <span className="text-base font-semibold">datum<span className="text-(--brand-blue)">labs</span></span>
          </Link>
          <nav className="ml-6 hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            {site.nav.filter((n) => n.href !== '/').map((n) => <Link key={n.href} href={n.href} className="hover:text-foreground">{n.label}</Link>)}
          </nav>
          <div className="ml-auto"><ThemeToggle /></div>
        </div>
      </header>
      <main data-slot="page" className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-16">{children}</main>
      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs text-muted-foreground">
          <span>{site.footnote}</span>
          <span>{site.owner}</span>
        </div>
      </footer>
    </div>
  );
}
