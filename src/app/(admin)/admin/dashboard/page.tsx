
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, FlaskConical, PlusCircle, School, University } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const institutionTypes = [
  { name: 'Primary School', icon: School, type: 'School' },
  { name: 'Junior College', icon: Building, type: 'Junior College' },
  { name: 'Engineering College', icon: FlaskConical, type: 'Engineering College' },
  { name: 'University', icon: University, type: 'University' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">Admin Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage the content of the Campus Finder application.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Add New Institution</CardTitle>
            <CardDescription>
              Select an institution type to add a new entry to the database.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {institutionTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Link href={`/admin/add-institution?type=${type.type}`}>
                  <Card className="flex h-full flex-col items-center justify-center p-6 text-center transition-all hover:shadow-lg hover:bg-muted/50">
                    <type.icon className="h-12 w-12 text-primary" />
                    <h3 className="mt-4 text-lg font-semibold">{type.name}</h3>
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
  );
}
