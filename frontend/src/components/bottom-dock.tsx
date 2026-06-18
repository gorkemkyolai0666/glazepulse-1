'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Wrench,
  Sparkles,
  Package,
  Tags,
  Settings,
  Sun,
  Moon,
  LogOut,
  MoreHorizontal,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const primaryNav = [
  { href: '/dashboard', label: 'Panel', icon: LayoutDashboard },
  { href: '/presses', label: 'Presler', icon: BookOpen },
  { href: '/binding-jobs', label: 'İşler', icon: Layers },
  { href: '/press-maintenance', label: 'Bakım', icon: Wrench },
];

const secondaryNav = [
  { href: '/finishing-checklists', label: 'Bitirme', icon: Sparkles },
  { href: '/material-orders', label: 'Malzeme', icon: Package },
  { href: '/service-rates', label: 'Tarifeler', icon: Tags },
  { href: '/settings', label: 'Ayarlar', icon: Settings },
];

export function BottomDock() {
  const pathname = usePathname();
  const { bindery, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const renderLink = (item: (typeof primaryNav)[number]) => {
    const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          'flex min-w-[4.5rem] flex-col items-center gap-1 border-t-2 px-2 py-2 text-[10px] font-semibold uppercase tracking-wide transition-colors',
          active
            ? 'border-accent bg-accent/10 text-accent'
            : 'border-transparent text-muted-foreground hover:text-foreground',
        )}
        aria-current={active ? 'page' : undefined}
      >
        <Icon className="h-5 w-5" strokeWidth={active ? 2.25 : 1.75} />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-primary/20 bg-card/95 backdrop-blur lg:hidden"
        aria-label="Ana menü"
      >
        <div className="mx-auto flex max-w-6xl items-end justify-between">
          {primaryNav.map(renderLink)}
          <details className="group relative min-w-[4.5rem]">
            <summary className="flex cursor-pointer list-none flex-col items-center gap-1 border-t-2 border-transparent px-2 py-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground marker:content-none">
              <MoreHorizontal className="h-5 w-5" />
              <span>Daha</span>
            </summary>
            <div className="absolute bottom-full right-0 mb-2 w-48 border-2 border-primary/20 bg-card p-2 shadow-lg">
              {secondaryNav.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-sm',
                      active ? 'bg-accent/10 text-accent' : 'text-muted-foreground hover:bg-muted',
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-2 flex items-center justify-between border-t border-border px-2 pt-2">
                <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Tema değiştir">
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={logout} aria-label="Çıkış yap">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </details>
        </div>
        {bindery?.name && (
          <p className="truncate px-4 pb-2 text-center text-[10px] text-muted-foreground">{bindery.name}</p>
        )}
      </nav>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r-2 border-primary/20 bg-card/95 backdrop-blur lg:flex">
        <div className="border-b-2 border-primary/15 px-6 py-6">
          <p className="font-display text-2xl text-primary">BindPulse</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Neo-Victorian Archive</p>
          <p className="mt-3 truncate text-sm text-muted-foreground">{bindery?.name || 'Cilt Atölyesi'}</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4" aria-label="Masaüstü menü">
          {[...primaryNav, ...secondaryNav].map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 border-l-2 px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-transparent text-muted-foreground hover:border-primary/30 hover:bg-muted',
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t-2 border-primary/15 p-4">
          {user && (
            <p className="mb-3 truncate text-xs text-muted-foreground">
              {user.firstName} {user.lastName}
            </p>
          )}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Tema değiştir">
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={logout} aria-label="Çıkış yap">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
