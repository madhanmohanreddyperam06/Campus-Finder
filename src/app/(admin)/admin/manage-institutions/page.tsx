'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Edit, Trash2, Eye, Plus, Filter } from 'lucide-react';
import { useInstitutions } from '@/hooks/use-institutions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ManageInstitutionsPage() {
  const { institutions, deleteInstitution } = useInstitutions();
  const { toast } = useToast();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [institutionToDelete, setInstitutionToDelete] = useState<string | null>(null);

  const filteredInstitutions = institutions.filter(institution => {
    const matchesSearch = institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institution.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institution.location.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || institution.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (id: string) => {
    router.push(`/admin/edit-institution/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/institutions/${id}`);
  };

  const handleDelete = async () => {
    if (institutionToDelete) {
      try {
        await deleteInstitution(institutionToDelete);
        toast({
          title: "Success",
          description: "Institution deleted successfully",
        });
        setDeleteDialogOpen(false);
        setInstitutionToDelete(null);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete institution",
          variant: "destructive",
        });
      }
    }
  };

  const confirmDelete = (id: string) => {
    setInstitutionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'School': return 'bg-blue-100 text-blue-800';
      case 'Junior College': return 'bg-green-100 text-green-800';
      case 'Engineering College': return 'bg-purple-100 text-purple-800';
      case 'University': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">Manage Institutions</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              View, edit, and delete institution records
            </p>
          </div>
          <Button onClick={() => router.push('/admin/add-institution')}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Institution
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Institution Database</CardTitle>
            <CardDescription>
              Total: {filteredInstitutions.length} institutions found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Controls */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search institutions by name, city, or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="School">School</SelectItem>
                  <SelectItem value="Junior College">Junior College</SelectItem>
                  <SelectItem value="Engineering College">Engineering College</SelectItem>
                  <SelectItem value="University">University</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Institutions Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInstitutions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No institutions found matching your criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInstitutions.map((institution) => (
                      <TableRow key={institution.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{institution.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Est. {institution.establishmentYear}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(institution.type)}>
                            {institution.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{institution.location.city}</div>
                            <div className="text-sm text-muted-foreground">
                              {institution.location.state}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="font-medium">{institution.rating}</span>
                            <span className="text-muted-foreground">/5</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(institution.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(institution.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => confirmDelete(institution.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this institution? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Institution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
