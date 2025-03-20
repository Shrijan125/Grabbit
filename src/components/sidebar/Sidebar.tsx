'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Home, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname(); // Get the current route

  const navItems = [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Profile', href: '/profile', icon: User },
    { title: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}

      <aside
        className={cn(
          'bg-sidebar fixed top-0 bottom-0 z-30 flex h-full w-64 flex-col border-r transition-all duration-300 ease-in-out',
          open ? 'left-0' : '-left-full md:left-0 md:w-16',
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 py-4">
          <Link
            href="/dashboard"
            className="flex items-center transition-opacity duration-300"
          >
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-md">
              <span className="text-primary-foreground font-medium">G</span>
            </div>
            <h1
              className={cn(
                'ml-2 text-lg font-medium transition-opacity duration-200',
                open ? 'opacity-100' : 'opacity-0 md:hidden',
              )}
            >
              Grabbit
            </h1>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(!open)}
            className="hidden md:flex"
            title={open ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>

        <nav className="mt-4 flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href; // Compare current path with link

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center rounded-md px-3 py-2 text-sm transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
                )}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5 min-w-5',
                    isActive ? 'text-primary' : '',
                  )}
                />
                <span
                  className={cn(
                    'ml-3 transition-opacity duration-200',
                    open ? 'opacity-100' : 'opacity-0 md:hidden',
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <div
            className={cn(
              'bg-accent/50 text-accent-foreground rounded-md p-3 text-xs transition-opacity duration-200',
              open ? 'opacity-100' : 'opacity-0 md:hidden',
            )}
          >
            <p>Need help?</p>
            <p className="text-muted-foreground mt-1">
              Check our documentation
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
