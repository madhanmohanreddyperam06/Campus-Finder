'use client';

import { HardHat } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminComingSoonPage() {
  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      >
        <HardHat className="h-24 w-24 text-primary" />
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-4xl font-bold tracking-tighter"
      >
        Coming Soon
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-2 text-muted-foreground"
      >
        The Admin Panel is currently under construction.
      </motion.p>
    </div>
  );
}
