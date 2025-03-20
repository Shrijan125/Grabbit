'use client';
import React, { useEffect } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { isAuthenticated } from '@/lib/auth';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const router = useRouter();

  if (isAuthenticated()) {
    return router.replace('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="bg-primary/5 relative flex w-full flex-col justify-center overflow-hidden p-8 md:w-1/2">
        <div className="bg-primary/10 absolute -top-20 -left-20 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-primary/20 absolute -right-10 -bottom-10 h-80 w-80 rounded-full blur-3xl" />

        <div className="animate-slide-in relative z-10 mx-auto max-w-md text-center md:mr-auto md:text-left">
          <div className="bg-primary mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl md:mx-0">
            <span className="text-primary-foreground text-xl font-medium">
              G
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Welcome to Grabbit
          </h1>

          <p className="text-muted-foreground mb-6 text-lg text-balance">
            Experience our intuitive dashboard with a focus on simplicity and
            functionality.
          </p>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-primary/10 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-5 w-5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="ml-3 text-left">Clean, intuitive interface</p>
            </div>

            <div className="flex items-center">
              <div className="bg-primary/10 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-5 w-5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="ml-3 text-left">Data management & filtering</p>
            </div>

            <div className="flex items-center">
              <div className="bg-primary/10 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-5 w-5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="ml-3 text-left">Responsive on all devices</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-8 md:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <LoginForm />

          <div className="mt-6">
            <div className="flex items-center">
              <Separator className="flex-1" />
              <span className="text-muted-foreground px-4 text-sm">
                Demo credentials
              </span>
              <Separator className="flex-1" />
            </div>

            <div className="bg-muted/50 text-muted-foreground mt-4 rounded-lg p-4 text-sm">
              <p className="mb-1">
                Email: <span className="font-mono">user@example.com</span>
              </p>
              <p>
                Password: <span className="font-mono">password</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
