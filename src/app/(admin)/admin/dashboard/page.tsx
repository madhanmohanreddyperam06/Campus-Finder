
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, FlaskConical, PlusCircle, School, University, Users, FileText, Settings, BarChart3, Search, Edit, Shield, Database, Activity } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useInstitutions } from '@/hooks/use-institutions';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const institutionTypes = [
  { name: 'Primary School', icon: School, type: 'School', description: 'Kindergarten, Primary, and Secondary schools' },
  { name: 'Junior College', icon: Building, type: 'Junior College', description: 'Intermediate education, typically classes XI-XII' },
  { name: 'Engineering College', icon: FlaskConical, type: 'Engineering College', description: 'Institutions offering technical degrees in engineering' },
  { name: 'University', icon: University, type: 'University', description: 'Higher education institutions offering wide range of degrees' },
];

const adminFeatures = [
  {
    icon: Database,
    title: 'Manage Institutions',
    description: 'Add, edit, and delete educational institutions',
    href: '/admin/manage-institutions',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Search,
    title: 'Search Content',
    description: 'Manage search suggestions and featured content',
    href: '/admin/search-content',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: FileText,
    title: 'About Page',
    description: 'Edit about page content and information',
    href: '/admin/about-page',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Settings,
    title: 'System Settings',
    description: 'Configure system preferences and settings',
    href: '/admin/profile',
    color: 'from-orange-500 to-orange-600'
  }
];

export default function AdminDashboardPage() {
  const { institutions } = useInstitutions();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalInstitutions: 0,
    schools: 0,
    juniorColleges: 0,
    engineeringColleges: 0,
    universities: 0
  });

  useEffect(() => {
    const totalInstitutions = institutions.length;
    const schools = institutions.filter(i => i.type === 'School').length;
    const juniorColleges = institutions.filter(i => i.type === 'Junior College').length;
    const engineeringColleges = institutions.filter(i => i.type === 'Engineering College').length;
    const universities = institutions.filter(i => i.type === 'University').length;

    setStats({
      totalInstitutions,
      schools,
      juniorColleges,
      engineeringColleges,
      universities
    });
  }, [institutions]);

  return (
    <div className="w-full bg-background text-foreground">
      {/* Welcome Hero Section */}
      <div className="container grid min-h-screen w-full place-items-center gap-8 py-12">
        {/* Full Width Welcome Section */}
        <div className="flex flex-col items-center justify-center space-y-8 pt-12 text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl text-center"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Admin Panel</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to Campus Finder Admin
            </h1>
            <p className="mt-4 max-w-[800px] text-muted-foreground md:text-xl text-center">
              Manage educational institutions, search content, and system settings with our comprehensive admin dashboard.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full max-w-6xl"
          >
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200 dark:border-blue-800">
              <CardContent className="p-3 text-center">
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{stats.totalInstitutions}</div>
                <div className="text-xs text-blue-700 dark:text-blue-300">Total Institutions</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-green-200 dark:border-green-800">
              <CardContent className="p-3 text-center">
                <div className="text-xl font-bold text-green-600 dark:text-green-400">{stats.schools}</div>
                <div className="text-xs text-green-700 dark:text-green-300">Primary Schools</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30 border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-3 text-center">
                <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{stats.juniorColleges}</div>
                <div className="text-xs text-yellow-700 dark:text-yellow-300">Junior Colleges</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 border-red-200 dark:border-red-800">
              <CardContent className="p-3 text-center">
                <div className="text-xl font-bold text-red-600 dark:text-red-400">{stats.engineeringColleges}</div>
                <div className="text-xs text-red-700 dark:text-red-300">Engineering Colleges</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border-purple-200 dark:border-purple-800">
              <CardContent className="p-3 text-center">
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{stats.universities}</div>
                <div className="text-xs text-purple-700 dark:text-purple-300">Universities</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Add New Institution Section - Moved Down */}
      <section className="w-full bg-muted py-16 md:py-24 lg:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">Add New Institution</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Expand your database by adding new educational institutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50">
              <CardContent className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2 lg:grid-cols-4">
                {institutionTypes.map((type, index) => (
                  <motion.div
                    key={type.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <Link href={`/admin/add-institution?type=${type.type}`}>
                      <Card className="flex h-full flex-col items-center justify-center p-6 text-center transition-all hover:shadow-lg hover:bg-muted/50 hover:scale-105 cursor-pointer">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white mb-4">
                          <type.icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-semibold">{type.name}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{type.description}</p>
                        <Button variant="outline" className="mt-4">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add {type.name}
                        </Button>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Activity Overview Section */}
      <section className="w-full bg-muted py-16 md:py-24 lg:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">Platform Overview</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Monitor and manage your educational platform effectively.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border-orange-200 dark:border-orange-800">
              <CardContent className="p-6 text-center">
                <Activity className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.juniorColleges}</div>
                <div className="text-sm text-orange-700 dark:text-orange-300">Junior Colleges</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/30 border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-6 text-center">
                <University className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.universities}</div>
                <div className="text-sm text-indigo-700 dark:text-indigo-300">Universities</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Active</div>
                <div className="text-sm text-emerald-700 dark:text-emerald-300">System Status</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/30 dark:to-pink-900/30 border-pink-200 dark:border-pink-800">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 text-pink-600 dark:text-pink-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">100%</div>
                <div className="text-sm text-pink-700 dark:text-pink-300">Data Integrity</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
