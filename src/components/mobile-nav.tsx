
'use client';

import {
  Heart,
  History,
  Home,
  Search,
  User,
  Sparkles,
  GitCompareArrows,
  Briefcase,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const mainNavItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/ai-recommendations', label: 'AI Recommendation', icon: Sparkles },
  { href: '/ai-career-guide', label: 'AI Career Guide', icon: Briefcase },
  { href: '#more', label: 'More', icon: User },
];

const accountNavItems = [
  { href: '/profile', label: 'Profile', icon: UserCircle },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/history', label: 'History', icon: History },
  { href: '/compare', label: 'Compare', icon: GitCompareArrows },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid h-16 grid-cols-5">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.href === '#more') {
            return (
              <Sheet key="more">
                <SheetTrigger asChild>
                  <button className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[50vh]">
                  <SheetHeader>
                    <SheetTitle>More Options</SheetTitle>
                    <SheetDescription>
                      Access additional features and settings
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    {accountNavItems.map((accountItem) => {
                      const isAccountActive = pathname === accountItem.href;
                      return (
                        <Link
                          key={accountItem.href}
                          href={accountItem.href}
                          className={`flex items-center gap-3 rounded-lg p-3 text-sm transition-colors ${isAccountActive
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent hover:text-accent-foreground'
                            }`}
                        >
                          <accountItem.icon className="h-4 w-4" />
                          <span>{accountItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 text-xs ${isActive ? 'text-primary font-bold' : 'text-muted-foreground'
                }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
