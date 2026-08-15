import React from 'react';
import { CustomAsset, Language, ZakatFormData } from '../../types/zakat';
import { formatCurrency, getCurrency } from '../../constants/currencies';
import { translations } from '../../translations/translations';
import { Plus, Trash2, Layers } from 'lucide-react';

interface Step6OtherAssetsProps {
  formData: ZakatFormData;
  updateFormData: (updates: Partial<ZakatFormData>) => void;
  lang: Language;
}

export const Step6OtherAssets: React.FC<Step6OtherAssetsProps> = ({
  formData,
  updateFormData,
  lang
}) => {
  const t = translations[lang];
  const currSymbol = getCurrency(formData.currency).symbol;

  const customAssets = formData.customAssets || [];

  const handleAddAsset = () => {
    const newItem: CustomAsset = {
      id: 'asset_' + Date.now(),
      name: '',
      amount: 0,
      description: ''
    };
    updateFormData({
      customAssets: [...customAssets, newItem]
    });
  };

  const handleRemoveAsset = (id: string) => {
    updateFormData({
      customAssets: customAssets.filter((a) => a.id !== id)
    });
  };

  const handleItemChange = (id: string, field: keyof CustomAsset, val: any) => {
    updateFormData({
      customAssets: customAssets.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            [field]: field === 'amount' ? (isNaN(parseFloat(val)) ? 0 : parseFloat(val)) : val
          };
        }
        return a;
      })
    });
  };

  const customSubtotal = customAssets.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Subtotal Banner */}
      <div className="bg-emerald-950/5 border border-emerald-900/10 p-5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-800 text-amber-400 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {t.labels.subtotal}
            </span>
            <span className="text-2xl font-bold text-emerald-950 font-serif">
              {formatCurrency(customSubtotal, formData.currency)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddAsset}
          id="add-custom-asset-btn"
          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>{t.labels.addCustomAsset}</span>
        </button>
      </div>

      {/* Asset Items List */}
      {customAssets.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
          <p className="text-sm font-semibold text-slate-600">
            {lang === 'ur'
              ? 'کوئی خاص اثاثہ شامل نہیں کیا گیا۔ اگر آپ کا کوئی اور قابلِ زکوٰۃ مال ہے تو اوپر بٹن پر کلک کریں۔'
              : 'No custom assets added. Click the button above to add custom zakatable items.'}
          </p>
          <button
            type="button"
            onClick={handleAddAsset}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-emerald-900 font-bold text-xs rounded-xl inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t.labels.addCustomAsset}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {customAssets.map((asset, idx) => (
            <div
              key={asset.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative group"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-emerald-900 uppercase">
                  Custom Asset #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveAsset(asset.id)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded-lg transition-colors"
                  title="Remove Asset"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.labels.assetName}
                  </label>
                  <input
                    type="text"
                    value={asset.name}
                    onChange={(e) => handleItemChange(asset.id, 'name', e.target.value)}
                    placeholder="e.g., Agricultural yield profits"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.labels.assetAmount}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-semibold">
                      {currSymbol}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={asset.amount || ''}
                      onChange={(e) => handleItemChange(asset.id, 'amount', e.target.value)}
                      placeholder="0"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  {t.labels.assetDesc} (Optional)
                </label>
                <input
                  type="text"
                  value={asset.description || ''}
                  onChange={(e) => handleItemChange(asset.id, 'description', e.target.value)}
                  placeholder="Notes or scholarly context"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-100 text-xs text-slate-600"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
