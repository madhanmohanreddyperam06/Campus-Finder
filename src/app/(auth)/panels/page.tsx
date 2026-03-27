
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PanelsPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <GraduationCap className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Welcome to Campus Finder
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Please select your role to continue.
        </p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="text-center transition-all hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="mt-4 text-2xl font-bold">ADMIN PANEL</CardTitle>
              <CardDescription>Access the administrative dashboard to manage content and users.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => router.push('/login?role=admin')}>
                Enter
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center transition-all hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="mt-4 text-2xl font-bold">USER PANEL</CardTitle>
              <CardDescription>Explore institutions, search for courses, and manage your profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => router.push('/login')}>
                Enter
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
