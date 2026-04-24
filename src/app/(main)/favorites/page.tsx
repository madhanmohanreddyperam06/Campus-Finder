
'use client';

import { useFavorites } from '@/hooks/use-favorites';
import { InstitutionCard } from '@/components/institution-card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInstitutions } from '@/hooks/use-institutions';

export default function FavoritesPage() {
  const { favoriteIds, clearFavorites } = useFavorites();
  const { institutions: allInstitutions } = useInstitutions();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const favoriteInstitutions = allInstitutions.filter(inst => favoriteIds.includes(inst.id));

  if (!isClient) {
     return (
        <div className="flex h-[calc(100vh-15rem)] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card text-center">
            <Heart className="h-16 w-16 animate-pulse text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-semibold">Loading Favorites...</h2>
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
          <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">Your Favorites</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            A curated list of institutions you're interested in.
          </p>
        </div>
        {isClient && favoriteInstitutions.length > 0 && (
            <Button variant="destructive" onClick={clearFavorites}>
                Clear All
            </Button>
        )}
      </motion.div>

      {isClient && favoriteInstitutions.length > 0 ? (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {favoriteInstitutions.map((inst, index) => (
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
            <Heart className="h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-semibold">No Favorites Yet</h2>
            <p className="mt-2 text-muted-foreground">Click the heart icon on any institution to save it here.</p>
            <Button asChild className="mt-6">
                <Link href="/">Discover Institutions</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
