'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Search, Filter, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface SearchSuggestion {
  id: string;
  term: string;
  category: string;
  priority: number;
  isActive: boolean;
}

interface FeaturedInstitution {
  id: string;
  institutionId: string;
  name: string;
  type: string;
  order: number;
  isActive: boolean;
}

interface SearchFilter {
  id: string;
  name: string;
  type: 'state' | 'city' | 'course' | 'ranking' | 'grade';
  values: string[];
  isActive: boolean;
}

export default function SearchContentPage() {
  const { toast } = useToast();
  
  // Search Suggestions State
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([
    { id: '1', term: 'engineering colleges in Bangalore', category: 'location', priority: 1, isActive: true },
    { id: '2', term: 'top MBA colleges', category: 'course', priority: 2, isActive: true },
    { id: '3', term: 'NIRF ranked universities', category: 'ranking', priority: 1, isActive: true },
  ]);

  // Featured Institutions State
  const [featuredInstitutions, setFeaturedInstitutions] = useState<FeaturedInstitution[]>([
    { id: '1', institutionId: 'inst1', name: 'IIT Bombay', type: 'Engineering College', order: 1, isActive: true },
    { id: '2', institutionId: 'inst2', name: 'Delhi University', type: 'University', order: 2, isActive: true },
  ]);

  // Search Filters State
  const [searchFilters, setSearchFilters] = useState<SearchFilter[]>([
    { 
      id: '1', 
      name: 'States', 
      type: 'state', 
      values: ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Uttar Pradesh'], 
      isActive: true 
    },
    { 
      id: '2', 
      name: 'NAAC Grades', 
      type: 'grade', 
      values: ['A++', 'A+', 'A', 'B++', 'B+'], 
      isActive: true 
    },
  ]);

  // New suggestion form state
  const [newSuggestion, setNewSuggestion] = useState({
    term: '',
    category: 'location',
    priority: 1,
    isActive: true,
  });

  const handleAddSuggestion = () => {
    if (!newSuggestion.term.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    const suggestion: SearchSuggestion = {
      id: Date.now().toString(),
      ...newSuggestion,
    };

    setSearchSuggestions([...searchSuggestions, suggestion]);
    setNewSuggestion({ term: '', category: 'location', priority: 1, isActive: true });
    
    toast({
      title: "Success",
      description: "Search suggestion added successfully",
    });
  };

  const handleDeleteSuggestion = (id: string) => {
    setSearchSuggestions(searchSuggestions.filter(s => s.id !== id));
    toast({
      title: "Success",
      description: "Search suggestion deleted",
    });
  };

  const handleToggleSuggestion = (id: string) => {
    setSearchSuggestions(searchSuggestions.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const handleAddFilterValue = (filterId: string, value: string) => {
    if (!value.trim()) return;
    
    setSearchFilters(searchFilters.map(f => 
      f.id === filterId 
        ? { ...f, values: [...f.values, value.trim()] }
        : f
    ));
  };

  const handleRemoveFilterValue = (filterId: string, valueIndex: number) => {
    setSearchFilters(searchFilters.map(f => 
      f.id === filterId 
        ? { ...f, values: f.values.filter((_, i) => i !== valueIndex) }
        : f
    ));
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">Search Content Management</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage search suggestions, featured institutions, and search filters
          </p>
        </div>
      </motion.div>

      <Tabs defaultValue="suggestions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suggestions">Search Suggestions</TabsTrigger>
          <TabsTrigger value="featured">Featured Institutions</TabsTrigger>
          <TabsTrigger value="filters">Search Filters</TabsTrigger>
        </TabsList>

        {/* Search Suggestions Tab */}
        <TabsContent value="suggestions">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Search Suggestions</CardTitle>
                <CardDescription>
                  Manage auto-complete suggestions that appear in the search bar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Suggestion */}
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium">Add New Suggestion</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="suggestion-term">Search Term</Label>
                      <Input
                        id="suggestion-term"
                        placeholder="Enter search suggestion..."
                        value={newSuggestion.term}
                        onChange={(e) => setNewSuggestion({...newSuggestion, term: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="suggestion-category">Category</Label>
                      <Select value={newSuggestion.category} onValueChange={(value) => setNewSuggestion({...newSuggestion, category: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="location">Location</SelectItem>
                          <SelectItem value="course">Course</SelectItem>
                          <SelectItem value="ranking">Ranking</SelectItem>
                          <SelectItem value="grade">Grade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="suggestion-priority">Priority</Label>
                      <Select value={newSuggestion.priority.toString()} onValueChange={(value) => setNewSuggestion({...newSuggestion, priority: parseInt(value)})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">High</SelectItem>
                          <SelectItem value="2">Medium</SelectItem>
                          <SelectItem value="3">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="suggestion-active"
                      checked={newSuggestion.isActive}
                      onCheckedChange={(checked) => setNewSuggestion({...newSuggestion, isActive: checked})}
                    />
                    <Label htmlFor="suggestion-active">Active</Label>
                  </div>
                  <Button onClick={handleAddSuggestion}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Suggestion
                  </Button>
                </div>

                {/* Existing Suggestions */}
                <div className="space-y-3">
                  <h3 className="font-medium">Existing Suggestions ({searchSuggestions.length})</h3>
                  <div className="space-y-2">
                    {searchSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className="font-medium">{suggestion.term}</div>
                            <div className="text-sm text-muted-foreground">
                              <Badge variant="outline">{suggestion.category}</Badge>
                              <span className="ml-2">Priority: {suggestion.priority}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={suggestion.isActive}
                            onCheckedChange={() => handleToggleSuggestion(suggestion.id)}
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteSuggestion(suggestion.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Featured Institutions Tab */}
        <TabsContent value="featured">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Featured Institutions</CardTitle>
                <CardDescription>
                  Manage institutions that appear in the featured section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <Star className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium">Featured Institutions</h3>
                  <p className="text-muted-foreground">
                    Select and arrange institutions to feature on the homepage
                  </p>
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Featured Institution
                  </Button>
                </div>
                
                {featuredInstitutions.map((institution) => (
                  <div key={institution.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="font-medium">{institution.order}</div>
                      <div>
                        <div className="font-medium">{institution.name}</div>
                        <div className="text-sm text-muted-foreground">{institution.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={institution.isActive} />
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Search Filters Tab */}
        <TabsContent value="filters">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Search Filters</CardTitle>
                <CardDescription>
                  Manage filter options available in the search interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {searchFilters.map((filter) => (
                  <div key={filter.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium">{filter.name}</h3>
                        <Badge variant="outline">{filter.type}</Badge>
                      </div>
                      <Switch checked={filter.isActive} />
                    </div>
                    <div className="space-y-2">
                      <Label>Filter Values</Label>
                      <div className="flex flex-wrap gap-2">
                        {filter.values.map((value, index) => (
                          <Badge key={index} variant="secondary" className="cursor-pointer">
                            {value}
                            <button
                              onClick={() => handleRemoveFilterValue(filter.id, index)}
                              className="ml-2 text-xs"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add new filter value..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddFilterValue(filter.id, (e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                        />
                        <Button
                          onClick={() => {
                            const input = document.querySelector(`input[placeholder="Add new filter value..."]`) as HTMLInputElement;
                            if (input) {
                              handleAddFilterValue(filter.id, input.value);
                              input.value = '';
                            }
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
