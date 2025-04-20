// ██████╗ █████╗ ██████╗ ███████╗██╗  ██╗
// ██╔════╝██╔══██╗██╔══██╗██╔════╝╚██╗██╔╝
// ██║     ███████║██║  ██║█████╗   ╚███╔╝ 
// ██║     ██╔══██║██║  ██║██╔══╝   ██╔██╗ 
// ╚██████╗██║  ██║██████╔╝███████╗██╔╝ ██╗
// ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
// Trinket Management Component for Admin Panel

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { trinketService, userService } from '@/lib/api/services';
import { logUserAction } from '@/lib/utils/logging';
import { sanitizeInput } from '@/lib/utils/errorHandling';
import type { Trinket, User } from '@/types';

export function TrinketManagement() {
  const [trinkets, setTrinkets] = useState<Trinket[]>([]);
  const [filteredTrinkets, setFilteredTrinkets] = useState<Trinket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAwardDialog, setShowAwardDialog] = useState(false);
  const [selectedTrinket, setSelectedTrinket] = useState<Trinket | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [usersLoading, setUsersLoading] = useState(false);
  
  // Form state for create/edit
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    category: 'achievement',
    requirements: '',
    pointValue: 10,
    isActive: true,
  });
  
  // Error state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Fetch trinkets on component mount
  useEffect(() => {
    fetchTrinkets();
  }, []);
  
  // Filter trinkets when search term or category filter changes
  useEffect(() => {
    if (!trinkets.length) return;
    
    let filtered = [...trinkets];
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(trinket => trinket.category === categoryFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(trinket => 
        trinket.name.toLowerCase().includes(term) ||
        trinket.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredTrinkets(filtered);
  }, [trinkets, searchTerm, categoryFilter]);
  
  // Fetch all trinkets
  const fetchTrinkets = async () => {
    setLoading(true);
    try {
      const response = await trinketService.getAllTrinkets();
      if (response.success && response.data) {
        setTrinkets(response.data);
        setFilteredTrinkets(response.data);
        logUserAction('Admin fetched trinket list');
      }
    } catch (error) {
      console.error('Failed to fetch trinkets:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch users for award dialog
  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await userService.getAllUsers(1, 100);
      if (response.success && response.data) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setUsersLoading(false);
    }
  };
  
  // Handle input change for form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0,
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: sanitizeInput(value),
      });
    }
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };
  
  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };
  
  // Validate form data
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!formData.imageUrl.trim()) {
      errors.imageUrl = 'Image URL is required';
    }
    
    if (!formData.requirements.trim()) {
      errors.requirements = 'Requirements are required';
    }
    
    if (formData.pointValue < 0) {
      errors.pointValue = 'Point value must be a positive number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Open create trinket dialog
  const openCreateDialog = () => {
    setFormData({
      name: '',
      description: '',
      imageUrl: '',
      category: 'achievement',
      requirements: '',
      pointValue: 10,
      isActive: true,
    });
    setFormErrors({});
    setShowCreateDialog(true);
  };
  
  // Open edit trinket dialog
  const openEditDialog = (trinket: Trinket) => {
    setSelectedTrinket(trinket);
    setFormData({
      name: trinket.name,
      description: trinket.description,
      imageUrl: trinket.imageUrl,
      category: trinket.category,
      requirements: trinket.requirements,
      pointValue: trinket.pointValue,
      isActive: trinket.isActive,
    });
    setFormErrors({});
    setShowEditDialog(true);
  };
  
  // Open delete trinket dialog
  const openDeleteDialog = (trinket: Trinket) => {
    setSelectedTrinket(trinket);
    setShowDeleteDialog(true);
  };
  
  // Open award trinket dialog
  const openAwardDialog = (trinket: Trinket) => {
    setSelectedTrinket(trinket);
    setSelectedUserId('');
    setShowAwardDialog(true);
    fetchUsers();
  };
  
  // Create new trinket
  const createTrinket = async () => {
    if (!validateForm()) return;
    
    try {
      const response = await trinketService.createTrinket({
        ...formData,
        createdAt: new Date().toISOString(),
        createdBy: 'admin', // In a real app, this would be the current user's ID
      });
      
      if (response.success && response.data) {
        setTrinkets([...trinkets, response.data]);
        setShowCreateDialog(false);
        logUserAction('Admin created new trinket', { trinketId: response.data.id });
      }
    } catch (error) {
      console.error('Failed to create trinket:', error);
      setFormErrors({
        ...formErrors,
        general: 'Failed to create trinket. Please try again.',
      });
    }
  };
  
  // Update existing trinket
  const updateTrinket = async () => {
    if (!selectedTrinket || !validateForm()) return;
    
    try {
      const response = await trinketService.updateTrinket(selectedTrinket.id, formData);
      
      if (response.success && response.data) {
        setTrinkets(trinkets.map(trinket => 
          trinket.id === selectedTrinket.id ? response.data : trinket
        ));
        setShowEditDialog(false);
        logUserAction('Admin updated trinket', { trinketId: selectedTrinket.id });
      }
    } catch (error) {
      console.error('Failed to update trinket:', error);
      setFormErrors({
        ...formErrors,
        general: 'Failed to update trinket. Please try again.',
      });
    }
  };
  
  // Delete trinket
  const deleteTrinket = async () => {
    if (!selectedTrinket) return;
    
    try {
      const response = await trinketService.deleteTrinket(selectedTrinket.id);
      
      if (response.success) {
        setTrinkets(trinkets.filter(trinket => trinket.id !== selectedTrinket.id));
        setShowDeleteDialog(false);
        logUserAction('Admin deleted trinket', { trinketId: selectedTrinket.id });
      }
    } catch (error) {
      console.error('Failed to delete trinket:', error);
    }
  };
  
  // Award trinket to user
  const awardTrinket = async () => {
    if (!selectedTrinket || !selectedUserId) return;
    
    try {
      const response = await trinketService.awardTrinket(selectedUserId, selectedTrinket.id);
      
      if (response.success) {
        setShowAwardDialog(false);
        logUserAction('Admin awarded trinket to user', { 
          trinketId: selectedTrinket.id,
          userId: selectedUserId
        });
      }
    } catch (error) {
      console.error('Failed to award trinket:', error);
    }
  };
  
  // Render category badge with appropriate color
  const renderCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      achievement: 'bg-green-500',
      participation: 'bg-blue-500',
      excellence: 'bg-purple-500',
      custom: 'bg-orange-500',
    };
    
    return (
      <Badge className={colors[category] || 'bg-gray-500'}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    );
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Trinket Management</CardTitle>
              <CardDescription>
                Manage rewards, badges, and achievements
              </CardDescription>
            </div>
            <Button 
              className="bg-[#6200ee] hover:bg-[#3700b3] dark:bg-[#bb86fc] dark:text-[#121212]"
              onClick={openCreateDialog}
            >
              Create New Trinket
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search trinkets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select
              value={categoryFilter}
              onValueChange={(value) => setCategoryFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="achievement">Achievement</SelectItem>
                <SelectItem value="participation">Participation</SelectItem>
                <SelectItem value="excellence">Excellence</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {loading ? (
            <div className="flex justify-center my-8">
              <div className="animate-spin h-8 w-8 border-4 border-[#6200ee] border-t-transparent rounded-full"></div>
            </div>
          ) : filteredTrinkets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No trinkets found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTrinkets.map((trinket) => (
                <Card key={trinket.id} className="overflow-hidden">
                  <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {trinket.imageUrl ? (
                      <img 
                        src={trinket.imageUrl} 
                        alt={trinket.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 dark:text-gray-600">No Image</div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{trinket.name}</CardTitle>
                      {renderCategoryBadge(trinket.category)}
                    </div>
                    <CardDescription>
                      {trinket.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm">
                      <div className="mb-1">
                        <span className="font-semibold">Requirements:</span> {trinket.requirements}
                      </div>
                      <div className="mb-1">
                        <span className="font-semibold">Points:</span> {trinket.pointValue}
                      </div>
                      <div>
                        <span className="font-semibold">Status:</span>{' '}
                        {trinket.isActive ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                            Inactive
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openAwardDialog(trinket)}
                    >
                      Award
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(trinket)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => openDeleteDialog(trinket)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Create Trinket Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Trinket</DialogTitle>
            <DialogDescription>
              Create a new badge or achievement to award to users.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs">{formErrors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
              {formErrors.description && (
                <p className="text-red-500 text-xs">{formErrors.description}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="imageUrl">Image URL</label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
              {formErrors.imageUrl && (
                <p className="text-red-500 text-xs">{formErrors.imageUrl}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category">Category</label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="achievement">Achievement</SelectItem>
                  <SelectItem value="participation">Participation</SelectItem>
                  <SelectItem value="excellence">Excellence</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="requirements">Requirements</label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows={2}
              />
              {formErrors.requirements && (
                <p className="text-red-500 text-xs">{formErrors.requirements}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="pointValue">Point Value</label>
              <Input
                id="pointValue"
                name="pointValue"
                type="number"
                value={formData.pointValue.toString()}
                onChange={handleInputChange}
                min="0"
              />
              {formErrors.pointValue && (
                <p className="text-red-500 text-xs">{formErrors.pointValue}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange as any}
                className="rounded border-gray-300"
              />
              <label htmlFor="isActive">Active</label>
            </div>
            
            {formErrors.general && (
              <p className="text-red-500 text-sm">{formErrors.general}</p>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#6200ee] hover:bg-[#3700b3] dark:bg-[#bb86fc] dark:text-[#121212]"
              onClick={createTrinket}
            >
              Create Trinket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Trinket Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Trinket</DialogTitle>
            <DialogDescription>
              Update trinket details and requirements.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="editName">Name</label>
              <Input
                id="editName"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs">{formErrors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="editDescription">Description</label>
              <Textarea
                id="editDescription"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
              {formErrors.description && (
                <p className="text-red-500 text-xs">{formErrors.description}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="editImageUrl">Image URL</label>
              <Input
                id="editImageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
              {formErrors.imageUrl && (
                <p className="text-red-500 text-xs">{formErrors.imageUrl}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="editCategory">Category</label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="achievement">Achievement</SelectItem>
                  <SelectItem value="participation">Participation</SelectItem>
                  <SelectItem value="excellence">Excellence</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="editRequirements">Requirements</label>
              <Textarea
                id="editRequirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows={2}
              />
              {formErrors.requirements && (
                <p className="text-red-500 text-xs">{formErrors.requirements}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="editPointValue">Point Value</label>
              <Input
                id="editPointValue"
                name="pointValue"
                type="number"
                value={formData.pointValue.toString()}
                onChange={handleInputChange}
                min="0"
              />
              {formErrors.pointValue && (
                <p className="text-red-500 text-xs">{formErrors.pointValue}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="editIsActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange as any}
                className="rounded border-gray-300"
              />
              <label htmlFor="editIsActive">Active</label>
            </div>
            
            {formErrors.general && (
              <p className="text-red-500 text-sm">{formErrors.general}</p>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#6200ee] hover:bg-[#3700b3] dark:bg-[#bb86fc] dark:text-[#121212]"
              onClick={updateTrinket}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Trinket Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the trinket{' '}
              <span className="font-semibold">
                {selectedTrinket?.name}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={deleteTrinket}
            >
              Delete Trinket
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Award Trinket Dialog */}
      <Dialog open={showAwardDialog} onOpenChange={setShowAwardDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Award Trinket</DialogTitle>
            <DialogDescription>
              Award "{selectedTrinket?.name}" to a user.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="userId">Select User</label>
              {usersLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin h-4 w-4 border-2 border-[#6200ee] border-t-transparent rounded-full"></div>
                  <span>Loading users...</span>
                </div>
              ) : (
                <Select
                  value={selectedUserId}
                  onValueChange={setSelectedUserId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} ({user.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            
            {selectedTrinket && (
              <div className="p-4 border rounded-md">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center overflow-hidden">
                    {selectedTrinket.imageUrl ? (
                      <img 
                        src={selectedTrinket.imageUrl} 
                        alt={selectedTrinket.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 dark:text-gray-600">No Image</div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedTrinket.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedTrinket.description}</p>
                    <div className="mt-1">
                      {renderCategoryBadge(selectedTrinket.category)}
                      <span className="ml-2 text-sm">
                        {selectedTrinket.pointValue} points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAwardDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#6200ee] hover:bg-[#3700b3] dark:bg-[#bb86fc] dark:text-[#121212]"
              onClick={awardTrinket}
              disabled={!selectedUserId}
            >
              Award Trinket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
