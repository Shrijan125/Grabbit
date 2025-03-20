'use client';
import React, { ReactNode, useEffect } from 'react';
import { isAuthenticated } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/Header';
import { Sidebar } from '@/components/sidebar/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="bg-background flex min-h-screen w-full">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}
      >
        <Header
          sidebarOpen={sidebarOpen}
          onSidebarOpenChange={setSidebarOpen}
        />

        <main className="animate-fade-in flex-1 p-6">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
