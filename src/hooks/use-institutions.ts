
'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';
import { institutions as defaultInstitutions } from '@/lib/data';
import type { Institution } from '@/lib/types';

export const useInstitutions = () => {
  const [institutions, setInstitutions] = useLocalStorage<Institution[]>('institutions-data', defaultInstitutions);

  const addInstitution = useCallback((newInstitution: Institution) => {
    setInstitutions(prevInstitutions => [newInstitution, ...prevInstitutions]);
  }, [setInstitutions]);

  const updateInstitution = useCallback((id: string, updatedData: Partial<Institution>) => {
    setInstitutions(prevInstitutions =>
      prevInstitutions.map(inst =>
        inst.id === id ? { ...inst, ...updatedData } : inst
      )
    );
  }, [setInstitutions]);

  const deleteInstitution = useCallback((id: string) => {
    setInstitutions(prevInstitutions =>
      prevInstitutions.filter(inst => inst.id !== id)
    );
  }, [setInstitutions]);

  return { institutions, addInstitution, updateInstitution, deleteInstitution };
};
