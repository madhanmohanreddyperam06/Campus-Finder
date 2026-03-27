"use client";

import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';

const HISTORY_LIMIT = 20;

export const useHistory = () => {
  const [historyIds, setHistoryIds] = useLocalStorage<string[]>('history', []);

  const addToHistory = useCallback((id: string) => {
    setHistoryIds(prevIds => {
      // Create a new array with the new id at the front, filtering out any existing instance of it.
      const newHistory = [id, ...prevIds.filter(historyId => historyId !== id)];
      // Trim the history to the limit.
      return newHistory.slice(0, HISTORY_LIMIT);
    });
  }, [setHistoryIds]);

  const clearHistory = useCallback(() => {
    setHistoryIds([]);
  }, [setHistoryIds]);

  return { historyIds, addToHistory, clearHistory };
};
