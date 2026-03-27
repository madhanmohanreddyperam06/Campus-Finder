
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';

const ZOOM_STEP = 0.1;
const MIN_ZOOM = 0.8;
const MAX_ZOOM = 1.5;
const DEFAULT_ZOOM = 1.0;

export const useZoom = () => {
  const [zoom, setZoom] = useLocalStorage('zoomLevel', DEFAULT_ZOOM);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.style.transform = `scale(${zoom})`;
      }
    }
    return () => {
      if (isClient) {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.transform = '';
        }
      }
    };
  }, [zoom, isClient]);

  const zoomIn = useCallback(() => {
    setZoom(prevZoom => {
      const newZoom = parseFloat((prevZoom + ZOOM_STEP).toFixed(2));
      return Math.min(newZoom, MAX_ZOOM);
    });
  }, [setZoom]);

  const zoomOut = useCallback(() => {
    setZoom(prevZoom => {
      const newZoom = parseFloat((prevZoom - ZOOM_STEP).toFixed(2));
      return Math.max(newZoom, MIN_ZOOM);
    });
  }, [setZoom]);

  const resetZoom = useCallback(() => {
    setZoom(DEFAULT_ZOOM);
  }, [setZoom]);

  return { zoom, zoomIn, zoomOut, resetZoom };
};
