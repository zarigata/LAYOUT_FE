"use client";

// ██████╗ █████╗ ██████╗ ███████╗██╗  ██╗
// ██╔════╝██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
// ██║     ███████║██║  ██║█████╗   ╚███╔╝ 
// ██║     ██╔══██║██║  ██║██╔══╝   ██╔██╗ 
// ╚██████╗██║  ██║██████╔╝███████╗██╔╝ ██╗
// ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
// Admin Secret Panel - Secure admin dashboard

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/AuthProvider';
import { adminService } from '@/lib/api/services';
import { logUserAction } from '@/lib/utils/logging';
import { UserManagement } from './components/UserManagement';
import { SystemMetrics } from './components/SystemMetrics';
import { TrinketManagement } from './components/TrinketManagement';
import { ActivityLogs } from './components/ActivityLogs';
import type { SystemMetrics as SystemMetricsType } from '@/types';

export default function AdminSecretPanel() {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();
  const [metrics, setMetrics] = useState<SystemMetricsType | null>(null);
  const [metricsLoading, setMetricsLoading] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || userRole !== 'admin')) {
      router.push('/');
      logUserAction('Unauthorized access attempt to admin panel', { userRole });
    }
  }, [user, userRole, loading, router]);

  // Fetch system metrics
  useEffect(() => {
    const fetchMetrics = async () => {
      if (user && userRole === 'admin') {
        try {
          setMetricsLoading(true);
          const response = await adminService.getSystemMetrics();
          if (response.success && response.data) {
            setMetrics(response.data);
            logUserAction('Admin viewed system metrics');
          }
        } catch (error) {
          console.error('Failed to fetch system metrics:', error);
        } finally {
          setMetricsLoading(false);
        }
      }
    };

    fetchMetrics();
    // Set up refresh interval
    const interval = setInterval(fetchMetrics, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [user, userRole]);

  // Show loading state
  if (loading || !user || userRole !== 'admin') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-[#6200ee] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#121212] p-6">
      <header className="bg-[#3700b3] dark:bg-[#bb86fc] text-white p-4 rounded-lg shadow-md mb-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Admin Secret Panel</h1>
              <p className="text-white/80">
                Secure administration dashboard for EduDroid platform
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-green-500 px-2 py-1 rounded-full">
                Admin: {user.firstName} {user.lastName}
              </span>
              <Button 
                variant="outline" 
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                onClick={() => router.push('/')}
              >
                Exit Admin Panel
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto space-y-6">
        {/* Quick Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard 
            title="Total Users" 
            value={metrics?.totalUsers.toString() || '...'}
            description="Registered platform users"
            loading={metricsLoading}
          />
          <MetricCard 
            title="Active Users" 
            value={metrics?.activeUsers.toString() || '...'}
            description="Users active in last 24h"
            loading={metricsLoading}
          />
          <MetricCard 
            title="Active Courses" 
            value={metrics?.activeCourses.toString() || '...'}
            description="Currently running courses"
            loading={metricsLoading}
          />
          <MetricCard 
            title="AI Interactions" 
            value={metrics?.aiInteractions.toString() || '...'}
            description="Last 24 hours"
            loading={metricsLoading}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="metrics">Service Insights</TabsTrigger>
            <TabsTrigger value="trinkets">Trinket Management</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <SystemMetrics metrics={metrics} loading={metricsLoading} />
          </TabsContent>

          <TabsContent value="trinkets" className="space-y-4">
            <TrinketManagement />
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <ActivityLogs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  loading?: boolean;
}

function MetricCard({ title, value, description, loading = false }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-7 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
