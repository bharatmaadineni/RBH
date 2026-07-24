/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast, clearToast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400" id="toast-icon-success" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400" id="toast-icon-warning" />,
    error: <XCircle className="w-5 h-5 text-rose-400" id="toast-icon-error" />,
    info: <Info className="w-5 h-5 text-sky-400" id="toast-icon-info" />,
  };

  const bgStyles = {
    success: 'border-emerald-500/30 bg-neutral-950/85 shadow-[0_8px_32px_rgba(16,185,129,0.15)]',
    warning: 'border-amber-500/30 bg-neutral-950/85 shadow-[0_8px_32px_rgba(245,158,11,0.15)]',
    error: 'border-rose-500/30 bg-neutral-950/85 shadow-[0_8px_32px_rgba(239,68,68,0.15)]',
    info: 'border-sky-500/30 bg-neutral-950/85 shadow-[0_8px_32px_rgba(14,165,233,0.15)]',
  };

  return (
    <div className="fixed top-6 right-6 z-50 pointer-events-none" id="toast-container">
      <AnimatePresence>
        <motion.div
          id="toast-box"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className={`flex items-center gap-3 p-4 rounded-xl border border-solid backdrop-blur-md pointer-events-auto max-w-sm ${bgStyles[toast.type]}`}
        >
          <div className="flex-shrink-0">{icons[toast.type]}</div>
          <p className="text-sm font-medium text-neutral-100 flex-1" id="toast-text">
            {toast.message}
          </p>
          <button
            id="toast-close-btn"
            onClick={clearToast}
            className="flex-shrink-0 text-neutral-400 hover:text-neutral-200 transition-colors p-1 hover:bg-white/5 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
