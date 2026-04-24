'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Shield, Calendar, Edit2, Save, Camera, Building, Award, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio: string;
  department: string;
  joinDate: string;
  lastLogin: string;
  permissions: string[];
}

export default function AdminProfilePage() {
  const { logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<AdminProfile>({
    id: 'admin-1',
    name: 'Madhan Mohan',
    email: 'madhanmohanreddyperam06@gmail.com',
    role: 'Super Admin',
    avatar: 'https://github.com/shadcn.png',
    bio: 'System administrator responsible for managing educational institution data and content. Passionate about education technology and improving student experiences.',
    department: 'IT Administration',
    joinDate: '2024-01-15',
    lastLogin: new Date().toISOString(),
    permissions: [
      'Manage Institutions',
      'Edit Content',
      'User Management',
      'System Settings',
      'Analytics Access'
    ]
  });

  const [editedProfile, setEditedProfile] = useState<AdminProfile>(profile);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to save profile
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProfile(editedProfile);
      setIsEditing(false);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setEditedProfile({
            ...editedProfile,
            avatar: e.target.result as string
          });
        }
      };
      reader.readAsDataURL(file);
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
            <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">Admin Profile</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Manage your administrator account settings
            </p>
          </div>
          <div className="flex space-x-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto group">
                <div className="relative">
                  <Avatar className="h-32 w-32 mx-auto border-4 border-white dark:border-gray-800 shadow-xl">
                    <AvatarImage src={isEditing ? editedProfile.avatar : profile.avatar} alt="Admin" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold">
                      {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute bottom-2 right-2">
                      <input
                        type="file"
                        id="avatar-upload"
                        className="hidden"
                        accept="image/png, image/jpeg"
                        onChange={handleAvatarChange}
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
                      >
                        <Camera className="h-5 w-5" />
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <CardTitle className="mt-6 text-2xl">
                {isEditing ? (
                  <Input
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="text-center font-bold text-xl border-2 bg-white/50 backdrop-blur-sm border-blue-200 rounded-lg"
                  />
                ) : (
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {profile.name}
                  </span>
                )}
              </CardTitle>
              <div className="mt-2 flex justify-center">
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 px-4 py-1.5 text-sm">
                  {profile.role}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{profile.email}</p>
                    <p className="text-xs text-muted-foreground">Email Address</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    {isEditing ? (
                      <Input
                        value={editedProfile.department}
                        onChange={(e) => setEditedProfile({ ...editedProfile, department: e.target.value })}
                        className="border-0 bg-transparent p-0 text-sm font-medium"
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{profile.department}</p>
                    )}
                    <p className="text-xs text-muted-foreground">Department</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                    <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{profile.joinDate}</p>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {new Date(profile.lastLogin).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Last Login</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  System Permissions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.permissions.map((permission, index) => (
                    <Badge key={index} variant="outline" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                      <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <Button
                variant="destructive"
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 transition-colors"
              >
                Logout
              </Button>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-blue-600" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      className="border-2 focus:border-blue-500 rounded-lg"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{profile.name}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email Address
                  </Label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{profile.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="role" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Role
                  </Label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                      {profile.role}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="department" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Department
                  </Label>
                  {isEditing ? (
                    <Input
                      id="department"
                      value={editedProfile.department}
                      onChange={(e) => setEditedProfile({ ...editedProfile, department: e.target.value })}
                      className="border-2 focus:border-blue-500 rounded-lg"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{profile.department}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="bio" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Bio
                </Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    rows={4}
                    className="border-2 focus:border-blue-500 rounded-lg resize-none"
                  />
                ) : (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{profile.bio}</p>
                  </div>
                )}
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100">Member Since</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{profile.joinDate}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900 dark:text-green-100">Last Login</h4>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {new Date(profile.lastLogin).toLocaleDateString()} at{' '}
                          {new Date(profile.lastLogin).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center text-lg">
                  <Award className="mr-2 h-5 w-5 text-blue-600" />
                  System Permissions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profile.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-green-900 dark:text-green-100">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
