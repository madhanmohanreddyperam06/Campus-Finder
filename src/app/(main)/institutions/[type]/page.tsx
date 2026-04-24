
'use client';

import { notFound, useParams } from 'next/navigation';
import { InstitutionCard } from '@/components/institution-card';
import { motion } from 'framer-motion';
import { useInstitutions } from '@/hooks/use-institutions';

const typeMap: Record<string, string> = {
  'school': 'School',
  'primary-school': 'School',
  'junior-college': 'Junior College',
  'engineering-college': 'Engineering College',
  'university': 'University',
};

const titleMap: Record<string, string> = {
    'School': 'Primary Schools',
    'Junior College': 'Junior Colleges',
    'Engineering College': 'Engineering Colleges',
    'University': 'Universities',
};

export default function InstitutionTypePage() {
  const params = useParams();
  const { institutions: allInstitutions } = useInstitutions();
  const typeSlug = Array.isArray(params.type) ? params.type[0] : params.type;
  
  const institutionType = typeMap[typeSlug] || null;

  if (!institutionType) {
    notFound();
  }
  
  const filteredInstitutions = allInstitutions.filter(
    (inst) => inst.type === institutionType
  );

  const pageTitle = titleMap[institutionType] || "Institutions";
  const pageDescription = `Browse our list of top ${pageTitle.toLowerCase()} in India.`;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">
          {pageTitle}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {pageDescription}
        </p>
      </motion.div>

      {filteredInstitutions.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredInstitutions.map((inst, index) => (
            <motion.div
              key={inst.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            >
              <InstitutionCard institution={inst} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex h-[calc(100vh-15rem)] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card text-center">
          <p className="text-xl font-semibold">No institutions found for this type.</p>
          <p className="mt-2 text-muted-foreground">
            Please check back later or try a different category.
          </p>
        </div>
      )}
    </div>
  );
}
