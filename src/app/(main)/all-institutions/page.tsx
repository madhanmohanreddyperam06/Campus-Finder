
'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { University, School, Building, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useInstitutions } from '@/hooks/use-institutions';
import { useMemo } from 'react';

export default function AllInstitutionsPage() {
  const { institutions: allInstitutions } = useInstitutions();

  const institutionGroups = useMemo(() => {
    const schools = allInstitutions.filter(inst => inst.type === 'School');
    const juniorColleges = allInstitutions.filter(inst => inst.type === 'Junior College');
    const engineeringColleges = allInstitutions.filter(inst => inst.type === 'Engineering College');
    const universities = allInstitutions.filter(inst => inst.type === 'University');

    return [
      { name: 'Primary Schools', count: schools.length, icon: School, institutions: schools, type: 'school' },
      { name: 'Junior Colleges', count: juniorColleges.length, icon: Building, institutions: juniorColleges, type: 'junior-college' },
      { name: 'Engineering Colleges', count: engineeringColleges.length, icon: FlaskConical, institutions: engineeringColleges, type: 'engineering-college' },
      { name: 'Universities', count: universities.length, icon: University, institutions: universities, type: 'university' },
    ];
  }, [allInstitutions]);

  const totalCount = allInstitutions.length;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">
          All Institutions
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          There are currently <span className="font-bold text-primary">{totalCount}</span> institutions in the project.
        </p>
      </motion.div>
      
       <Accordion type="multiple" defaultValue={institutionGroups.map(it => it.name)} className="w-full space-y-4">
        {institutionGroups.map((type, index) => (
            <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
            <Card>
                 <AccordionItem value={type.name} className="border-b-0">
                    <AccordionTrigger className="p-6 text-xl font-bold hover:no-underline">
                        <div className="flex items-center gap-3">
                             <type.icon className="h-6 w-6 text-primary" />
                            <span>{type.name}</span>
                            <Badge variant="secondary">{type.count}</Badge>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-6 pt-0">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {type.institutions.map(inst => (
                            <Link href={`/institution/${inst.id}`} key={inst.id}>
                                <div className="rounded-lg border p-4 transition-all hover:bg-muted/50 hover:shadow-md">
                                    <p className="font-semibold">{inst.name}</p>
                                    <p className="text-sm text-muted-foreground">{inst.location.city}, {inst.location.state}</p>
                                </div>
                            </Link>
                        ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Card>
           </motion.div>
        ))}
      </Accordion>
    </div>
  );
}
