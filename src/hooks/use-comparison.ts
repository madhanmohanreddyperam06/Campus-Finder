
'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useToast } from './use-toast';
import type { Institution } from '@/lib/types';

const COMPARISON_LIMIT = 2;

export const useComparison = () => {
  const [comparisonItems, setComparisonItems] = useLocalStorage<Institution[]>('comparison', []);
  const { toast } = useToast();
  const previousItemsRef = useRef(comparisonItems);

  useEffect(() => {
    const previousItems = previousItemsRef.current;
    
    // Check if an item was added
    if (comparisonItems.length > previousItems.length) {
      const newItem = comparisonItems.find(item => !previousItems.some(pItem => pItem.id === item.id));
      if (newItem) {
        if (comparisonItems.length > COMPARISON_LIMIT) {
             toast({
                title: "Comparison Limit Reached",
                description: `You can only compare up to ${COMPARISON_LIMIT} institutions at a time. Remove one to add another.`,
                variant: "destructive",
            });
            // Revert the change
            setComparisonItems(previousItems);
        } else {
            toast({ title: `${newItem.name} added to comparison.` });
        }
      }
    } 
    // Check if an item was removed
    else if (comparisonItems.length < previousItems.length) {
      const removedItem = previousItems.find(item => !comparisonItems.some(cItem => cItem.id === item.id));
      if (removedItem) {
        toast({ title: `${removedItem.name} removed from comparison.` });
      }
    }
    // Check if list was cleared
    else if (comparisonItems.length === 0 && previousItems.length > 0) {
        toast({ title: "Comparison list cleared." });
    }

    previousItemsRef.current = comparisonItems;
  }, [comparisonItems, toast, setComparisonItems]);


  const isInComparison = useCallback((id: string) => {
    return comparisonItems.some(item => item.id === id);
  }, [comparisonItems]);

  const toggleComparison = useCallback((institution: Institution) => {
    setComparisonItems(prevItems => {
      const isAlreadyIn = prevItems.some(item => item.id === institution.id);

      if (isAlreadyIn) {
        return prevItems.filter(item => item.id !== institution.id);
      } else {
        if (prevItems.length >= COMPARISON_LIMIT) {
          // The effect will show the toast and revert
          return [...prevItems, institution];
        }
        return [...prevItems, institution];
      }
    });
  }, [setComparisonItems]);

  const clearComparison = useCallback(() => {
    setComparisonItems([]);
  }, [setComparisonItems]);

  return { comparisonItems, isInComparison, toggleComparison, clearComparison, count: comparisonItems.length };
};
