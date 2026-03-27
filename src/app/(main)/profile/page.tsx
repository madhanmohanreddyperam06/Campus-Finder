
'use client';

import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, KeyRound, Bell, Link as LinkIcon, Shield, Trash2, Camera } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function ProfilePage() {
  const [avatar, setAvatar] = useState('https://github.com/shadcn.png');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">Your Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar} alt="User avatar" />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                size="icon"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={handleAvatarClick}
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Change photo</span>
              </Button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg"
              />
            </div>
             <div>
                <h3 className="text-xl font-semibold">Monu Kumar</h3>
                <p className="text-muted-foreground">monu.kumar@example.com</p>
             </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Monu Kumar" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue="New Delhi, India" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">Email Address (Cannot be changed)</Label>
              <Input id="email" type="email" defaultValue="monu.kumar@example.com" disabled />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Professional & Academic Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="education">Highest Qualification</Label>
                <Input id="education" defaultValue="Bachelor of Technology in Computer Science" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="interests">Fields of Interest</Label>
                <Input id="interests" defaultValue="Artificial Intelligence, Machine Learning, Web Development" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="aspirations">Career Aspirations</Label>
                <Input id="aspirations" defaultValue="Software Development Engineer at a top tech company" />
            </div>
        </CardContent>
      </Card>
      
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Social Profiles</CardTitle>
          <CardDescription>Link your social media accounts to your profile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <LinkIcon className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="linkedin" className="w-24">LinkedIn</Label>
            <Input id="linkedin" placeholder="linkedin.com/in/..." />
          </div>
          <div className="flex items-center gap-4">
            <LinkIcon className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="twitter" className="w-24">Twitter / X</Label>
            <Input id="twitter" placeholder="twitter.com/..." />
          </div>
          <div className="flex items-center gap-4">
            <LinkIcon className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="github" className="w-24">GitHub</Label>
            <Input id="github" placeholder="github.com/..." />
          </div>
        </CardContent>
      </Card>
      
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Account & Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline"><KeyRound className="mr-2 h-4 w-4" /> Change Password</Button>
          <Button variant="outline"><Shield className="mr-2 h-4 w-4" /> Two-Factor Authentication</Button>
        </CardContent>
      </Card>

      <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates and news via email.</p>
              </div>
              <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
               <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified on your device.</p>
              </div>
              <Switch />
          </div>
        </CardContent>
      </Card>

       <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>Permanently delete your account and all associated data. This action cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete My Account</Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg">Save All Changes</Button>
      </div>
    </div>
  );
}
