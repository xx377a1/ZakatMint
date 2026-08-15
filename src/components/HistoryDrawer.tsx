import React, { useState } from 'react';
import { CalculationHistoryItem, Language } from '../types/zakat';
import { formatCurrency } from '../constants/currencies';
import { translations } from '../translations/translations';
import { X, Trash2, Edit2, Bookmark, Check, Calendar, ArrowRight } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: CalculationHistoryItem[];
  onDeleteSingle: (id: string) => void;
  onRenameSingle: (id: string, newTitle: string) => void;
  onClearAll: () => void;
  lang: Language;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onDeleteSingle,
  onRenameSingle,
  onClearAll,
  lang
}) => {
  const t = translations[lang];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  if (!isOpen) return null;

  const handleStartRename = (item: CalculationHistoryItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
  };

  const handleSaveRename = (id: string) => {
    if (editTitle.trim()) {
      onRenameSingle(id, editTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-emerald-950 text-white">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold font-serif text-white">{t.history.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-900 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm text-slate-500 font-medium">{t.history.empty}</p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative group hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                  {editingId === item.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="px-2 py-1 text-xs border rounded-lg font-bold text-slate-900 flex-1"
                      />
                      <button
                        onClick={() => handleSaveRename(item.id)}
                        className="p-1 bg-emerald-800 text-white rounded-lg"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                      <button
                        onClick={() => handleStartRename(item)}
                        className="text-slate-400 hover:text-emerald-800"
                        title={t.history.rename}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => onDeleteSingle(item.id)}
                    className="text-slate-400 hover:text-red-600 p-1"
                    title={t.history.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(item.savedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="font-bold text-emerald-950 font-serif text-sm">
                    Zakat: {formatCurrency(item.result.estimatedZakat, item.currency)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {history.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <button
              onClick={onClearAll}
              className="w-full py-2.5 px-4 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t.history.deleteAll}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
