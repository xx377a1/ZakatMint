import React, { useState, useEffect } from 'react';
import { Language, MetalMarketData, ZakatFormData, ZakatResult } from '../../types/zakat';
import { getInitialFormData, saveDraft, loadSavedDraft } from '../../utils/storage';
import { calculateZakat } from '../../utils/zakatEngine';
import { translations } from '../../translations/translations';
import { Step1Currency } from './Step1Currency';
import { Step2Cash } from './Step2Cash';
import { Step3GoldSilver } from './Step3GoldSilver';
import { Step4Investments } from './Step4Investments';
import { Step5Business } from './Step5Business';
import { Step6OtherAssets } from './Step6OtherAssets';
import { Step7Liabilities } from './Step7Liabilities';
import { Step8NisabMethodology } from './Step8NisabMethodology';
import { StepReview } from './StepReview';
import { StepResult } from './StepResult';
import { ArrowLeft, ArrowRight, RotateCcw, Check, Calculator } from 'lucide-react';

interface WizardProps {
  metalData: MetalMarketData;
  onRefreshMetalPrices: (curr?: any) => void;
  lang: Language;
  onSaveToHistory: (formData: ZakatFormData, result: ZakatResult) => void;
}

export const Wizard: React.FC<WizardProps> = ({
  metalData,
  onRefreshMetalPrices,
  lang,
  onSaveToHistory
}) => {
  const t = translations[lang];

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ZakatFormData>(() => {
    return loadSavedDraft() || getInitialFormData();
  });

  const [result, setResult] = useState<ZakatResult | null>(null);

  // Sync metal prices when selected currency changes
  useEffect(() => {
    if (formData.currency !== metalData.currency) {
      onRefreshMetalPrices(formData.currency);
    }
  }, [formData.currency, metalData.currency, onRefreshMetalPrices]);

  // Auto save draft to local storage
  useEffect(() => {
    saveDraft(formData);
  }, [formData]);

  const updateFormData = (updates: Partial<ZakatFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const totalSteps = 10; // 1 to 8 input, 9 review, 10 result

  const stepTitles = [
    t.calc.step1Title,
    t.calc.step2Title,
    t.calc.step3Title,
    t.calc.step4Title,
    t.calc.step5Title,
    t.calc.step6Title,
    t.calc.step7Title,
    t.calc.step8Title,
    t.calc.reviewTitle,
    t.calc.resultTitle
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      if (currentStep === 8) {
        // Go to review
        setCurrentStep(9);
      } else if (currentStep === 9) {
        // Compute Zakat & go to result
        handlePerformCalculation();
      } else {
        setCurrentStep(currentStep + 1);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePerformCalculation = () => {
    const calcResult = calculateZakat(
      formData,
      metalData.goldPricePerGram,
      metalData.silverPricePerGram
    );
    setResult(calcResult);
    setCurrentStep(10);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartNew = () => {
    setFormData(getInitialFormData());
    setResult(null);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPct = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Wizard Header & Progress Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-amber-600 bg-amber-100/80 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
              {t.calc.progress} {currentStep} / {totalSteps}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-serif">
              {stepTitles[currentStep - 1]}
            </h1>
          </div>

          {currentStep > 1 && (
            <button
              onClick={handleStartNew}
              id="wizard-reset-btn"
              className="text-xs text-slate-500 hover:text-red-600 font-bold flex items-center gap-1.5 self-start sm:self-center transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Calculator</span>
            </button>
          )}
        </div>

        {/* Progress bar track */}
        <div className="space-y-2">
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Step dots on larger screens */}
          <div className="hidden sm:flex justify-between text-[11px] font-bold text-slate-400 pt-1">
            {Array.from({ length: 8 }).map((_, i) => {
              const stepNum = i + 1;
              const isCompleted = currentStep > stepNum;
              const isCurrent = currentStep === stepNum;
              return (
                <button
                  key={stepNum}
                  onClick={() => setCurrentStep(stepNum)}
                  className={`flex items-center gap-1 transition-colors ${
                    isCurrent
                      ? 'text-emerald-900 font-extrabold'
                      : isCompleted
                      ? 'text-emerald-700'
                      : 'text-slate-400'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-emerald-900 text-white'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3 h-3" /> : stepNum}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Content Container */}
      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <Step1Currency
            formData={formData}
            updateFormData={updateFormData}
            metalData={metalData}
            onRefreshMetalPrices={onRefreshMetalPrices}
            lang={lang}
          />
        )}

        {currentStep === 2 && (
          <Step2Cash
            formData={formData}
            updateFormData={updateFormData}
            lang={lang}
          />
        )}

        {currentStep === 3 && (
          <Step3GoldSilver
            formData={formData}
            updateFormData={updateFormData}
            metalData={metalData}
            lang={lang}
          />
        )}

        {currentStep === 4 && (
          <Step4Investments
            formData={formData}
            updateFormData={updateFormData}
            lang={lang}
          />
        )}

        {currentStep === 5 && (
          <Step5Business
            formData={formData}
            updateFormData={updateFormData}
            lang={lang}
          />
        )}

        {currentStep === 6 && (
          <Step6OtherAssets
            formData={formData}
            updateFormData={updateFormData}
            lang={lang}
          />
        )}

        {currentStep === 7 && (
          <Step7Liabilities
            formData={formData}
            updateFormData={updateFormData}
            lang={lang}
          />
        )}

        {currentStep === 8 && (
          <Step8NisabMethodology
            formData={formData}
            updateFormData={updateFormData}
            metalData={metalData}
            lang={lang}
          />
        )}

        {currentStep === 9 && (
          <StepReview
            formData={formData}
            metalData={metalData}
            onJumpToStep={(step) => setCurrentStep(step)}
            onCalculate={handlePerformCalculation}
            lang={lang}
          />
        )}

        {currentStep === 10 && result && (
          <StepResult
            formData={formData}
            result={result}
            onStartNew={handleStartNew}
            onEditCalculation={() => setCurrentStep(9)}
            onSaveToHistory={() => onSaveToHistory(formData, result)}
            lang={lang}
          />
        )}
      </div>

      {/* Step Navigation Bar (For steps 1 to 8) */}
      {currentStep < 9 && (
        <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-center justify-between gap-4 no-print">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            id="wizard-prev-btn"
            className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-xs'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.calc.back}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            id="wizard-next-btn"
            className="px-8 py-3 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 text-white font-extrabold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-98"
          >
            <span>{currentStep === 8 ? 'Review Summary' : t.calc.next}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      )}

    </div>
  );
};
