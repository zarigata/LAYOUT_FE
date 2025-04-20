// ██████╗ █████╗ ██████╗ ███████╗██╗  ██╗
// ██╔════╝██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
// ██║     ███████║██║  ██║█████╗   ╚███╔╝ 
// ██║     ██╔══██║██║  ██║██╔══╝   ██╔██╗ 
// ╚██████╗██║  ██║██████╔╝███████╗██╔╝ ██╗
// ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
// System Metrics Component for Admin Panel

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { adminService } from '@/lib/api/services';
import { logUserAction } from '@/lib/utils/logging';
import { formatBytes } from '@/lib/utils/formatters';
import type { SystemMetrics as SystemMetricsType } from '@/types';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Props interface
interface SystemMetricsProps {
  metrics: SystemMetricsType | null;
  loading: boolean;
}

// Sample historical data (would come from API in production)
const userGrowthData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 145 },
  { month: 'Mar', users: 178 },
  { month: 'Apr', users: 210 },
  { month: 'May', users: 252 },
  { month: 'Jun', users: 290 },
  { month: 'Jul', users: 340 },
  { month: 'Aug', users: 376 },
  { month: 'Sep', users: 410 },
  { month: 'Oct', users: 452 },
  { month: 'Nov', users: 480 },
  { month: 'Dec', users: 520 },
];

const aiUsageData = [
  { day: 'Mon', tutor: 245, generator: 120 },
  { day: 'Tue', tutor: 285, generator: 150 },
  { day: 'Wed', tutor: 310, generator: 180 },
  { day: 'Thu', tutor: 290, generator: 160 },
  { day: 'Fri', tutor: 320, generator: 190 },
  { day: 'Sat', tutor: 180, generator: 95 },
  { day: 'Sun', tutor: 150, generator: 85 },
];

const userTypeData = [
  { name: 'Students', value: 420, color: '#4CAF50' },
  { name: 'Teachers', value: 80, color: '#2196F3' },
  { name: 'Admins', value: 20, color: '#F44336' },
];

const storageUsageData = [
  { name: 'Course Materials', value: 45, color: '#6200ee' },
  { name: 'User Data', value: 25, color: '#03dac6' },
  { name: 'Assignments', value: 20, color: '#ff9800' },
  { name: 'System', value: 10, color: '#607d8b' },
];

export function SystemMetrics({ metrics, loading }: SystemMetricsProps) {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [refreshing, setRefreshing] = useState(false);

  // Format storage size
  const formattedStorage = metrics ? formatBytes(metrics.storageUsed) : '0 B';
  
  // Handle refresh button click
  const handleRefresh = async () => {
    setRefreshing(true);
    
    // In a real app, this would refresh the metrics data
    // For now, we'll just simulate a delay
    setTimeout(() => {
      setRefreshing(false);
      logUserAction('Admin refreshed system metrics');
    }, 1000);
  };
  
  // Handle time range change
  const handleTimeRangeChange = (range: 'day' | 'week' | 'month' | 'year') => {
    setTimeRange(range);
    logUserAction('Admin changed metrics time range', { range });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Card className="w-full">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Service Insights</CardTitle>
                <CardDescription>
                  Platform usage metrics and performance indicators
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                disabled={refreshing || loading}
              >
                {refreshing ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-[#6200ee] border-t-transparent"></span>
                    Refreshing...
                  </>
                ) : 'Refresh Metrics'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Last updated: {metrics?.lastUpdated ? new Date(metrics.lastUpdated).toLocaleString() : 'Never'}
              </p>
            </div>
            
            <div className="mb-6">
              <Tabs 
                value={timeRange} 
                onValueChange={(value) => handleTimeRangeChange(value as any)}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 w-[400px]">
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {/* User Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Growth</CardTitle>
                  <CardDescription>Total registered users over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="users" 
                          stroke="#6200ee" 
                          strokeWidth={2}
                          name="Total Users"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* AI Usage Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Feature Usage</CardTitle>
                  <CardDescription>AI tutor vs. class generator usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={aiUsageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          dataKey="tutor" 
                          fill="#6200ee" 
                          name="AI Tutor"
                        />
                        <Bar 
                          dataKey="generator" 
                          fill="#03dac6" 
                          name="Class Generator"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* User Types Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Distribution</CardTitle>
                  <CardDescription>Breakdown by user role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {userTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Storage Usage Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Storage Usage</CardTitle>
                  <CardDescription>
                    Total storage used: {formattedStorage}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={storageUsageData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {storageUsageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Performance Metrics */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">System Performance</CardTitle>
                <CardDescription>
                  Key performance indicators for the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Average Response Time</h3>
                    <p className="text-2xl font-bold">120ms</p>
                    <p className="text-xs text-green-500">↓ 15ms from last week</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">API Requests/min</h3>
                    <p className="text-2xl font-bold">1,250</p>
                    <p className="text-xs text-red-500">↑ 320 from last week</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Error Rate</h3>
                    <p className="text-2xl font-bold">0.05%</p>
                    <p className="text-xs text-green-500">↓ 0.02% from last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
