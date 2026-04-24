'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PanelsPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <GraduationCap className="mx-auto h-16 w-16 text-blue-400" />
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Welcome to Campus Finder
        </h1>
        <p className="mt-3 text-lg text-gray-300">
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
          <Card className="text-center transition-all hover:shadow-xl hover:-translate-y-1 bg-slate-900 border-slate-700">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-900/30">
                <Shield className="h-10 w-10 text-blue-400" />
              </div>
              <CardTitle className="mt-4 text-2xl font-bold text-white">ADMIN PANEL</CardTitle>
              <CardDescription className="text-gray-400">Access the administrative dashboard to manage content and users.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => router.push('/login?role=admin')}>
                Enter
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center transition-all hover:shadow-xl hover:-translate-y-1 bg-slate-900 border-slate-700">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-900/30">
                <User className="h-10 w-10 text-blue-400" />
              </div>
              <CardTitle className="mt-4 text-2xl font-bold text-white">USER PANEL</CardTitle>
              <CardDescription className="text-gray-400">Explore institutions, search for courses, and manage your profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => router.push('/login')}>
                Enter
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
