
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
  { href: '/ai-recommendations', label: 'AI Recs', icon: Sparkles },
  { href: '/ai-career-guide', label: 'Career', icon: Briefcase },
];

const accountNavItems = [
  { href: '/profile', label: 'Profile', icon: UserCircle },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/history', label: 'History', icon: History },
  { href: '/compare', label: 'Compare', icon: GitCompareArrows },
  { href: '/ai-recommendations', label: 'AI Recs', icon: Sparkles },
  { href: '/ai-career-guide', label: 'Career', icon: Briefcase },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid h-16 grid-cols-4">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 text-xs ${
                isActive ? 'text-primary font-bold' : 'text-muted-foreground'
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
