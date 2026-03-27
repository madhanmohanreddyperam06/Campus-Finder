
'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import type { Institution } from '@/lib/types';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TopInstitutionsSectionProps {
  title: string;
  institutions: Institution[];
  icon: React.ElementType;
  viewAllLink: string;
}

export function TopInstitutionsSection({ title, institutions, icon: Icon, viewAllLink }: TopInstitutionsSectionProps) {
  return (
    <section className="w-full bg-muted py-16 md:py-24 lg:py-32">
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-card">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Icon className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold tracking-tighter">{title}</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search in this section..." className="w-64 bg-background pl-9" />
                </div>
                <Link href={viewAllLink} className="flex items-center text-sm font-medium text-primary hover:underline">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Institution Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {institutions.map((institution) => (
                    <TableRow key={institution.id}>
                      <TableCell className="font-medium">{institution.name}</TableCell>
                      <TableCell>{institution.location.city}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/institution/${institution.id}`} className="flex items-center justify-end text-sm font-medium text-primary hover:underline">
                          View <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
