
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  Home,
  Search,
  BookText,
  User,
  Heart,
  History,
  Download,
  LogOut,
  Trash2,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Undo2,
  Plus,
  Minus,
  MessageSquare,
  ClipboardList,
  GitCompareArrows,
  Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { useHistory } from '@/hooks/use-history';
import { useZoom } from '@/hooks/use-zoom';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileNav } from '@/components/mobile-nav';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/ai-recommendations', label: 'AI Recommendations', icon: Sparkles },
  { href: '/ai-career-guide', label: 'AI Career Guide', icon: Briefcase },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { clearHistory } = useHistory();
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();
  const [isClient, setIsClient] = useState(false);
  const isMobile = useIsMobile();
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();


  useEffect(() => {
    setIsClient(true);
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const isHomePage = pathname === '/home';
  
  if (isAuthenticated === null || isAuthenticated === false) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 hidden w-full border-b border-border/40 bg-gray-900 text-white md:block">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link href="/home" className="mr-6 flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Campus Finder
            </span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="hidden items-center gap-6 text-sm md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'transition-colors hover:text-white/80',
                    pathname === item.href
                      ? 'text-white font-semibold'
                      : 'text-white/60'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className='flex items-center gap-2'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-gray-700">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favorites">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Favorites</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/history">
                        <History className="mr-2 h-4 w-4" />
                        <span>History</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                   {isClient && (
                    <>
                      <div className="flex items-center justify-between px-2 py-1.5 text-sm">
                          <div className="flex items-center gap-2">
                              <span>Zoom</span>
                          </div>
                          <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={zoomOut}><Minus className="h-4 w-4" /></Button>
                              <span className="w-12 text-center text-sm">{Math.round(zoom * 100)}%</span>
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={zoomIn}><Plus className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={resetZoom}><Undo2 className="h-4 w-4" /></Button>
                          </div>
                      </div>
                      <DropdownMenuSeparator />
                    </>
                   )}
                  {isClient && (
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <span>More Tools</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                           <DropdownMenuItem asChild>
                             <Link href="/compare">
                               <GitCompareArrows className="mr-2 h-4 w-4" />
                               <span>Compare Institutions</span>
                             </Link>
                           </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/all-institutions">
                                <ClipboardList className="mr-2 h-4 w-4" />
                                <span>List of Institutions</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/ai-recommendations">
                              <Sparkles className="mr-2 h-4 w-4" />
                              <span>AI Recommendations</span>
                            </Link>
                          </DropdownMenuItem>
                           <DropdownMenuItem asChild>
                            <Link href="/ai-career-guide">
                              <Briefcase className="mr-2 h-4 w-4" />
                              <span>AI Career Guide</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem disabled>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Downloads</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={clearHistory}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Clear History</span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      <main id="main-content" className={cn("flex-1 pb-20 md:pb-8", !isHomePage && "container py-8")}>{children}</main>
      {isHomePage && <Footer />}
      {isClient && isMobile && <MobileNav />}
    </div>
  );
}
