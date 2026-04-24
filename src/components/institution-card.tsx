
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Star, Plus, Minus, Check, University, GitCompareArrows } from 'lucide-react';
import type { Institution } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useFavorites } from '@/hooks/use-favorites';
import { useEffect, useState } from 'react';
import { useComparison } from '@/hooks/use-comparison';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InstitutionCardProps {
  institution: Institution;
}

export function InstitutionCard({ institution }: InstitutionCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInComparison, toggleComparison } = useComparison();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isFav = isFavorite(institution.id);
  const isComparing = isInComparison(institution.id);

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/institution/${institution.id}`}>
          <div className="relative h-48 w-full bg-muted flex items-center justify-center">
            <University className="h-16 w-16 text-muted-foreground/50" />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <Badge variant="secondary" className="mb-2">{institution.type}</Badge>
          <Link href={`/institution/${institution.id}`}>
            <CardTitle className="mb-2 line-clamp-2 text-lg font-bold hover:text-primary">
              {institution.name}
            </CardTitle>
          </Link>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1.5 h-4 w-4" />
            <span>
              {institution.location.city}, {institution.location.state}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="flex items-center gap-1">
          <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
          <span className="font-bold">{institution.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2">
            {isClient && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleComparison(institution)}
                                aria-label="Toggle Compare"
                            >
                                <GitCompareArrows className={cn('h-5 w-5', isComparing ? 'text-primary' : 'text-muted-foreground')} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{isComparing ? 'Remove from Compare' : 'Add to Compare'}</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleFavorite(institution.id, institution.name)}
                                aria-label="Toggle Favorite"
                            >
                                <Heart className={cn('h-5 w-5', isFav ? 'fill-red-500 text-red-500' : 'text-muted-foreground')} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                             <p>{isFav ? 'Remove from Favorites' : 'Add to Favorites'}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
