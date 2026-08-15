import React from 'react';
import { X, Lock, ShieldCheck, Check } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-6 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold font-serif text-white">Privacy Policy & Client Guarantee</h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-emerald-300 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-700 leading-relaxed max-h-[70vh] overflow-y-auto">
          
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 font-medium">
            ZakatMint is designed from the ground up to respect your financial privacy. All asset entries, numbers, and calculation summaries remain 100% on your personal device.
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              1. No Account Required & Zero Remote Storage
            </h3>
            <p>
              We do not require user accounts, emails, or phone numbers for basic calculations. No financial numbers entered into ZakatMint are transmitted to remote servers.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              2. On-Device Local History
            </h3>
            <p>
              If you choose to save a calculation to local history, it is saved directly into your browser&apos;s local storage (`localStorage`). You have total control to view, rename, or permanently delete all local records at any time.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              3. PDF Generation Security
            </h3>
            <p>
              When downloading a PDF report, the document is constructed entirely inside your browser using client JavaScript (`jspdf`). No document files are rendered or saved on external servers.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
