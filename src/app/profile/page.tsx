import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getCurrentUser } from '@/lib/auth';

const Profile = () => {
  const user = getCurrentUser();

  if (!user) {
    return null;
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <div className="bg-primary/10 text-primary mb-2 inline-block rounded-full px-3 py-1 text-xs font-medium">
            Profile
          </div>
          <h1 className="mb-1 text-3xl font-bold tracking-tight">
            Your Profile
          </h1>
          <p className="text-muted-foreground">
            View and manage your profile information
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="animate-scale-in overflow-hidden">
            <div className="from-primary/20 to-primary/5 h-32 bg-gradient-to-r" />
            <div className="relative px-6">
              <Avatar className="border-background absolute -top-10 h-20 w-20 border-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </div>

            <CardHeader className="pt-10">
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                    Profile Information
                  </h3>
                  <Separator className="mb-3" />
                  <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <dt className="text-muted-foreground text-sm">
                        Full Name
                      </dt>
                      <dd className="text-base">{user.name}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground text-sm">
                        Email Address
                      </dt>
                      <dd className="text-base">{user.email}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground text-sm">User ID</dt>
                      <dd className="font-mono text-sm">{user.id}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground text-sm">
                        Member Since
                      </dt>
                      <dd className="text-base">November 2023</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="animate-slide-in">
              <CardHeader>
                <CardTitle>Account Activity</CardTitle>
                <CardDescription>
                  Your recent activity on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm">Logged in from Chrome on macOS</p>
                      <p className="text-muted-foreground text-xs">
                        Today, 10:30 AM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm">Updated profile information</p>
                      <p className="text-muted-foreground text-xs">
                        Yesterday, 2:15 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm">Logged in from Safari on iOS</p>
                      <p className="text-muted-foreground text-xs">
                        Nov 12, 9:00 AM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="animate-slide-in"
              style={{ animationDelay: '0.1s' }}
            >
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Your personal account preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-muted-foreground text-xs">
                      Enabled for security alerts only
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Two-Factor Authentication
                    </p>
                    <p className="text-muted-foreground text-xs">Not enabled</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Language</p>
                    <p className="text-muted-foreground text-xs">
                      English (United States)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
