'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Save, Eye, Upload, Plus, Trash2, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface AboutSection {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  order: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  isActive: boolean;
}

interface Statistic {
  id: string;
  label: string;
  value: string;
  description: string;
  isActive: boolean;
}

export default function AboutPageEditor() {
  const { toast } = useToast();
  
  // About Sections State
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([
    {
      id: '1',
      title: 'Our Mission',
      content: 'To empower students with comprehensive information about educational institutions, helping them make informed decisions about their academic future.',
      isActive: true,
      order: 1,
    },
    {
      id: '2',
      title: 'Our Vision',
      content: 'To become the most trusted platform for educational institution discovery and career guidance in India.',
      isActive: true,
      order: 2,
    },
  ]);

  // Team Members State
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & CEO',
      bio: 'Education technology expert with 15+ years of experience in higher education consulting.',
      image: '/team/rajesh.jpg',
      isActive: true,
    },
  ]);

  // Statistics State
  const [statistics, setStatistics] = useState<Statistic[]>([
    {
      id: '1',
      label: 'Institutions Listed',
      value: '10,000+',
      description: 'Comprehensive database of educational institutions across India',
      isActive: true,
    },
    {
      id: '2',
      label: 'Students Helped',
      value: '50,000+',
      description: 'Students have made informed decisions using our platform',
      isActive: true,
    },
  ]);

  // Page Settings State
  const [pageSettings, setPageSettings] = useState({
    pageTitle: 'About Campus Finder',
    metaDescription: 'Learn about Campus Finder - India\'s leading platform for discovering educational institutions with AI-powered recommendations.',
    showTeamSection: true,
    showStatistics: true,
    showContactForm: true,
  });

  // New section form state
  const [newSection, setNewSection] = useState({
    title: '',
    content: '',
    isActive: true,
  });

  // New team member form state
  const [newTeamMember, setNewTeamMember] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    isActive: true,
  });

  // New statistic form state
  const [newStatistic, setNewStatistic] = useState({
    label: '',
    value: '',
    description: '',
    isActive: true,
  });

  const handleAddSection = () => {
    if (!newSection.title.trim() || !newSection.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const section: AboutSection = {
      id: Date.now().toString(),
      ...newSection,
      order: aboutSections.length + 1,
    };

    setAboutSections([...aboutSections, section]);
    setNewSection({ title: '', content: '', isActive: true });
    
    toast({
      title: "Success",
      description: "Section added successfully",
    });
  };

  const handleAddTeamMember = () => {
    if (!newTeamMember.name.trim() || !newTeamMember.role.trim()) {
      toast({
        title: "Error",
        description: "Please fill in name and role",
        variant: "destructive",
      });
      return;
    }

    const member: TeamMember = {
      id: Date.now().toString(),
      ...newTeamMember,
    };

    setTeamMembers([...teamMembers, member]);
    setNewTeamMember({ name: '', role: '', bio: '', image: '', isActive: true });
    
    toast({
      title: "Success",
      description: "Team member added successfully",
    });
  };

  const handleAddStatistic = () => {
    if (!newStatistic.label.trim() || !newStatistic.value.trim()) {
      toast({
        title: "Error",
        description: "Please fill in label and value",
        variant: "destructive",
      });
      return;
    }

    const statistic: Statistic = {
      id: Date.now().toString(),
      ...newStatistic,
    };

    setStatistics([...statistics, statistic]);
    setNewStatistic({ label: '', value: '', description: '', isActive: true });
    
    toast({
      title: "Success",
      description: "Statistic added successfully",
    });
  };

  const handleSaveChanges = () => {
    // Here you would typically save to a database
    toast({
      title: "Success",
      description: "About page content saved successfully",
    });
  };

  const handlePreview = () => {
    // Here you would open a preview of the about page
    toast({
      title: "Preview",
      description: "Opening preview of about page...",
    });
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
            <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">About Page Editor</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Manage content and settings for the about page
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button onClick={handleSaveChanges}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Page Content</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="settings">Page Settings</TabsTrigger>
        </TabsList>

        {/* Page Content Tab */}
        <TabsContent value="content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>About Sections</CardTitle>
                <CardDescription>
                  Manage the main content sections of the about page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Section */}
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium">Add New Section</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="section-title">Section Title</Label>
                      <Input
                        id="section-title"
                        placeholder="Enter section title..."
                        value={newSection.title}
                        onChange={(e) => setNewSection({...newSection, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="section-content">Content</Label>
                      <Textarea
                        id="section-content"
                        placeholder="Enter section content..."
                        value={newSection.content}
                        onChange={(e) => setNewSection({...newSection, content: e.target.value})}
                        rows={4}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="section-active"
                        checked={newSection.isActive}
                        onCheckedChange={(checked) => setNewSection({...newSection, isActive: checked})}
                      />
                      <Label htmlFor="section-active">Active</Label>
                    </div>
                    <Button onClick={handleAddSection}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Section
                    </Button>
                  </div>
                </div>

                {/* Existing Sections */}
                <div className="space-y-4">
                  <h3 className="font-medium">Existing Sections ({aboutSections.length})</h3>
                  {aboutSections.map((section) => (
                    <div key={section.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <Input
                            value={section.title}
                            onChange={(e) => {
                              setAboutSections(aboutSections.map(s => 
                                s.id === section.id ? {...s, title: e.target.value} : s
                              ));
                            }}
                            className="font-medium mb-2"
                          />
                          <Textarea
                            value={section.content}
                            onChange={(e) => {
                              setAboutSections(aboutSections.map(s => 
                                s.id === section.id ? {...s, content: e.target.value} : s
                              ));
                            }}
                            rows={3}
                          />
                        </div>
                        <div className="ml-4 flex items-center space-x-2">
                          <Switch
                            checked={section.isActive}
                            onCheckedChange={(checked) => {
                              setAboutSections(aboutSections.map(s => 
                                s.id === section.id ? {...s, isActive: checked} : s
                              ));
                            }}
                          />
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Team Members Tab */}
        <TabsContent value="team">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage team member profiles displayed on the about page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Team Member */}
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium">Add Team Member</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="member-name">Name</Label>
                      <Input
                        id="member-name"
                        placeholder="Enter name..."
                        value={newTeamMember.name}
                        onChange={(e) => setNewTeamMember({...newTeamMember, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="member-role">Role</Label>
                      <Input
                        id="member-role"
                        placeholder="Enter role..."
                        value={newTeamMember.role}
                        onChange={(e) => setNewTeamMember({...newTeamMember, role: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="member-bio">Bio</Label>
                      <Textarea
                        id="member-bio"
                        placeholder="Enter bio..."
                        value={newTeamMember.bio}
                        onChange={(e) => setNewTeamMember({...newTeamMember, bio: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="member-image">Image URL</Label>
                      <Input
                        id="member-image"
                        placeholder="Enter image URL..."
                        value={newTeamMember.image}
                        onChange={(e) => setNewTeamMember({...newTeamMember, image: e.target.value})}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="member-active"
                        checked={newTeamMember.isActive}
                        onCheckedChange={(checked) => setNewTeamMember({...newTeamMember, isActive: checked})}
                      />
                      <Label htmlFor="member-active">Active</Label>
                    </div>
                  </div>
                  <Button onClick={handleAddTeamMember}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Team Member
                  </Button>
                </div>

                {/* Existing Team Members */}
                <div className="space-y-4">
                  <h3 className="font-medium">Existing Team Members ({teamMembers.length})</h3>
                  {teamMembers.map((member) => (
                    <div key={member.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={member.name}
                              onChange={(e) => {
                                setTeamMembers(teamMembers.map(m => 
                                  m.id === member.id ? {...m, name: e.target.value} : m
                                ));
                              }}
                            />
                          </div>
                          <div>
                            <Label>Role</Label>
                            <Input
                              value={member.role}
                              onChange={(e) => {
                                setTeamMembers(teamMembers.map(m => 
                                  m.id === member.id ? {...m, role: e.target.value} : m
                                ));
                              }}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Bio</Label>
                            <Textarea
                              value={member.bio}
                              onChange={(e) => {
                                setTeamMembers(teamMembers.map(m => 
                                  m.id === member.id ? {...m, bio: e.target.value} : m
                                ));
                              }}
                              rows={2}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="flex justify-between items-center">
                              <div className="flex-1 mr-4">
                                <Label>Image URL</Label>
                                <Input
                                  value={member.image}
                                  onChange={(e) => {
                                    setTeamMembers(teamMembers.map(m => 
                                      m.id === member.id ? {...m, image: e.target.value} : m
                                    ));
                                  }}
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={member.isActive}
                                  onCheckedChange={(checked) => {
                                    setTeamMembers(teamMembers.map(m => 
                                      m.id === member.id ? {...m, isActive: checked} : m
                                    ));
                                  }}
                                />
                                <Label>Active</Label>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="statistics">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>
                  Manage key statistics displayed on the about page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Statistic */}
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium">Add Statistic</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="stat-label">Label</Label>
                      <Input
                        id="stat-label"
                        placeholder="e.g., Institutions Listed"
                        value={newStatistic.label}
                        onChange={(e) => setNewStatistic({...newStatistic, label: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stat-value">Value</Label>
                      <Input
                        id="stat-value"
                        placeholder="e.g., 10,000+"
                        value={newStatistic.value}
                        onChange={(e) => setNewStatistic({...newStatistic, value: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stat-active">Active</Label>
                      <Switch
                        id="stat-active"
                        checked={newStatistic.isActive}
                        onCheckedChange={(checked) => setNewStatistic({...newStatistic, isActive: checked})}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <Label htmlFor="stat-description">Description</Label>
                      <Textarea
                        id="stat-description"
                        placeholder="Enter description..."
                        value={newStatistic.description}
                        onChange={(e) => setNewStatistic({...newStatistic, description: e.target.value})}
                        rows={2}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddStatistic}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Statistic
                  </Button>
                </div>

                {/* Existing Statistics */}
                <div className="space-y-4">
                  <h3 className="font-medium">Existing Statistics ({statistics.length})</h3>
                  {statistics.map((stat) => (
                    <div key={stat.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Label</Label>
                            <Input
                              value={stat.label}
                              onChange={(e) => {
                                setStatistics(statistics.map(s => 
                                  s.id === stat.id ? {...s, label: e.target.value} : s
                                ));
                              }}
                            />
                          </div>
                          <div>
                            <Label>Value</Label>
                            <Input
                              value={stat.value}
                              onChange={(e) => {
                                setStatistics(statistics.map(s => 
                                  s.id === stat.id ? {...s, value: e.target.value} : s
                                ));
                              }}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={stat.isActive}
                              onCheckedChange={(checked) => {
                                setStatistics(statistics.map(s => 
                                  s.id === stat.id ? {...s, isActive: checked} : s
                                ));
                              }}
                            />
                            <Label>Active</Label>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="md:col-span-3">
                            <Label>Description</Label>
                            <Textarea
                              value={stat.description}
                              onChange={(e) => {
                                setStatistics(statistics.map(s => 
                                  s.id === stat.id ? {...s, description: e.target.value} : s
                                ));
                              }}
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Page Settings Tab */}
        <TabsContent value="settings">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Page Settings</CardTitle>
                <CardDescription>
                  Configure page metadata and display options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="page-title">Page Title</Label>
                    <Input
                      id="page-title"
                      value={pageSettings.pageTitle}
                      onChange={(e) => setPageSettings({...pageSettings, pageTitle: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea
                      id="meta-description"
                      value={pageSettings.metaDescription}
                      onChange={(e) => setPageSettings({...pageSettings, metaDescription: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-medium">Display Options</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-team"
                        checked={pageSettings.showTeamSection}
                        onCheckedChange={(checked) => setPageSettings({...pageSettings, showTeamSection: checked})}
                      />
                      <Label htmlFor="show-team">Show Team Section</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-stats"
                        checked={pageSettings.showStatistics}
                        onCheckedChange={(checked) => setPageSettings({...pageSettings, showStatistics: checked})}
                      />
                      <Label htmlFor="show-stats">Show Statistics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-contact"
                        checked={pageSettings.showContactForm}
                        onCheckedChange={(checked) => setPageSettings({...pageSettings, showContactForm: checked})}
                      />
                      <Label htmlFor="show-contact">Show Contact Form</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
