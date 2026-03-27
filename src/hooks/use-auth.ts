
'use client';

import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = Cookies.get('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const login = useCallback(() => {
    Cookies.set('isAuthenticated', 'true', { expires: 7 }); // expires in 7 days
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove('isAuthenticated');
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
};
