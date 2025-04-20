// ██████╗ █████╗ ██████╗ ███████╗██╗  ██╗
// ██╔════╝██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
// ██║     ███████║██║  ██║█████╗   ╚███╔╝ 
// ██║     ██╔══██║██║  ██║██╔══╝   ██╔██╗ 
// ╚██████╗██║  ██║██████╔╝███████╗██╔╝ ██╗
// ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
// Activity Logs Component for Admin Panel

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { adminService } from '@/lib/api/services';
import { logUserAction } from '@/lib/utils/logging';
import type { ActivityLog, UserRole } from '@/types';

export function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<UserRole | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(50);
  
  // Fetch logs on component mount and when page changes
  useEffect(() => {
    fetchLogs();
  }, [page]);
  
  // Filter logs when search term, role filter, or category filter changes
  useEffect(() => {
    if (!logs.length) return;
    
    let filtered = [...logs];
    
    // Apply role filter
    if (userRoleFilter !== 'all') {
      filtered = filtered.filter(log => log.userRole === userRoleFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(log => {
        if (categoryFilter === 'auth') {
          return log.action.toLowerCase().includes('login') || 
                 log.action.toLowerCase().includes('logout') ||
                 log.action.toLowerCase().includes('register');
        } else if (categoryFilter === 'user') {
          return log.action.toLowerCase().includes('user');
        } else if (categoryFilter === 'content') {
          return log.action.toLowerCase().includes('course') || 
                 log.action.toLowerCase().includes('assignment') ||
                 log.action.toLowerCase().includes('material');
        } else if (categoryFilter === 'ai') {
          return log.action.toLowerCase().includes('ai') || 
                 log.action.toLowerCase().includes('tutor') ||
                 log.action.toLowerCase().includes('generator');
        } else if (categoryFilter === 'admin') {
          return log.action.toLowerCase().includes('admin');
        }
        return true;
      });
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(log => 
        log.action.toLowerCase().includes(term) ||
        log.userName.toLowerCase().includes(term) ||
        log.resource.toLowerCase().includes(term) ||
        (log.ipAddress && log.ipAddress.includes(term))
      );
    }
    
    setFilteredLogs(filtered);
  }, [logs, searchTerm, userRoleFilter, categoryFilter]);
  
  // Fetch activity logs
  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await adminService.getActivityLogs(page, pageSize);
      if (response.success && response.data) {
        setLogs(response.data);
        setFilteredLogs(response.data);
        
        // Set pagination info
        if (response.pagination) {
          setTotalPages(response.pagination.totalPages);
        }
        
        logUserAction('Admin viewed activity logs');
      }
    } catch (error) {
      console.error('Failed to fetch activity logs:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Open log details dialog
  const openDetailsDialog = (log: ActivityLog) => {
    setSelectedLog(log);
    setShowDetailsDialog(true);
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Render role badge with appropriate color
  const renderRoleBadge = (role: UserRole) => {
    const colors = {
      admin: 'bg-red-500',
      teacher: 'bg-blue-500',
      student: 'bg-green-500',
    };
    
    return (
      <Badge className={`${colors[role]}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  
  // Export logs to CSV
  const exportLogs = () => {
    // Convert logs to CSV format
    const headers = ['Timestamp', 'User', 'Role', 'Action', 'Resource', 'IP Address'];
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => [
        formatTimestamp(log.timestamp),
        log.userName,
        log.userRole,
        log.action,
        log.resource,
        log.ipAddress || 'Unknown'
      ].join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `activity_logs_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    logUserAction('Admin exported activity logs');
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>
                Track user actions and system events
              </CardDescription>
            </div>
            <Button 
              variant="outline"
              onClick={exportLogs}
              disabled={filteredLogs.length === 0}
            >
              Export to CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select
              value={userRoleFilter}
              onValueChange={(value) => setUserRoleFilter(value as UserRole | 'all')}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="auth">Authentication</SelectItem>
                <SelectItem value="user">User Activity</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="ai">AI Interactions</SelectItem>
                <SelectItem value="admin">Admin Actions</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {loading ? (
            <div className="flex justify-center my-8">
              <div className="animate-spin h-8 w-8 border-4 border-[#6200ee] border-t-transparent rounded-full"></div>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No activity logs found matching your criteria.
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="whitespace-nowrap">
                          {formatTimestamp(log.timestamp)}
                        </TableCell>
                        <TableCell>{log.userName}</TableCell>
                        <TableCell>{renderRoleBadge(log.userRole)}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {log.resource}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openDetailsDialog(log)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Log Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activity Log Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected activity
            </DialogDescription>
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Timestamp</h3>
                  <p>{formatTimestamp(selectedLog.timestamp)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">User</h3>
                  <p>{selectedLog.userName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">User ID</h3>
                  <p>{selectedLog.userId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                  <p>{renderRoleBadge(selectedLog.userRole)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Action</h3>
                <p>{selectedLog.action}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Resource</h3>
                <p>{selectedLog.resource}</p>
              </div>
              
              {selectedLog.resourceId && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Resource ID</h3>
                  <p>{selectedLog.resourceId}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">IP Address</h3>
                  <p>{selectedLog.ipAddress || 'Unknown'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">User Agent</h3>
                  <p className="truncate">{selectedLog.userAgent || 'Unknown'}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
