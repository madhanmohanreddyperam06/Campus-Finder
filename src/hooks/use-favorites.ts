"use client";

import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useToast } from './use-toast';

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<string[]>('favorites', []);
  const { toast } = useToast();

  const isFavorite = useCallback((id: string) => favoriteIds.includes(id), [favoriteIds]);

  const toggleFavorite = useCallback((id: string, name: string) => {
    setFavoriteIds(prevIds => {
      const isCurrentlyFavorite = prevIds.includes(id);
      if (isCurrentlyFavorite) {
        toast({ title: `${name} removed from favorites.` });
        return prevIds.filter(favId => favId !== id);
      } else {
        toast({ title: `${name} added to favorites!` });
        return [...prevIds, id];
      }
    });
  }, [setFavoriteIds, toast]);

  const clearFavorites = useCallback(() => {
    setFavoriteIds([]);
    toast({ title: "Favorites cleared."});
  }, [setFavoriteIds, toast]);

  return { favoriteIds, isFavorite, toggleFavorite, clearFavorites };
};
