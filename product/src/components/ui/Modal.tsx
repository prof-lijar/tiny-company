'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function Modal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-6 border border-slate-200">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <p className="text-slate-600 text-center">{message}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-bold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
