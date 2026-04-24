
'use client';

import { useHistory } from '@/hooks/use-history';
import { InstitutionCard } from '@/components/institution-card';
import { Button } from '@/components/ui/button';
import { History as HistoryIcon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInstitutions } from '@/hooks/use-institutions';

export default function HistoryPage() {
  const { historyIds, clearHistory } = useHistory();
  const { institutions: allInstitutions } = useInstitutions();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const viewedInstitutions = historyIds.map(id => allInstitutions.find(inst => inst.id === id)).filter(Boolean);

  if (!isClient) {
    return (
        <div className="flex h-[calc(100vh-15rem)] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card text-center">
            <HistoryIcon className="h-16 w-16 animate-pulse text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-semibold">Loading History...</h2>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">Viewing History</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            A list of institutions you've recently viewed.
          </p>
        </div>
        {isClient && viewedInstitutions.length > 0 && (
            <Button variant="destructive" onClick={clearHistory}>
                Clear History
            </Button>
        )}
      </motion.div>

      {isClient && viewedInstitutions.length > 0 ? (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {viewedInstitutions.map((inst, index) => inst && (
            <motion.div
                key={inst.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <InstitutionCard institution={inst} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex h-[calc(100vh-15rem)] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card text-center">
            <HistoryIcon className="h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-semibold">No History Yet</h2>
            <p className="mt-2 text-muted-foreground">Your recently viewed institutions will appear here.</p>
            <Button asChild className="mt-6">
                <Link href="/">Start Exploring</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
