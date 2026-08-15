import React, { useState } from 'react';
import { Language, PageView } from '../types/zakat';
import { translations } from '../translations/translations';
import { HelpCircle, ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';

interface FAQViewProps {
  onNavigate: (view: PageView) => void;
  lang: Language;
}

interface FAQItem {
  id: string;
  questionEn: string;
  questionUr: string;
  answerEn: string;
  answerUr: string;
  category: 'general' | 'nisab' | 'assets' | 'privacy';
}

export const FAQView: React.FC<FAQViewProps> = ({ onNavigate, lang }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState<string | null>('faq_1');

  const faqs: FAQItem[] = [
    {
      id: 'faq_1',
      questionEn: 'What is Zakat?',
      questionUr: 'زکوٰۃ کیا ہے؟',
      answerEn: 'Zakat is one of the Five Pillars of Islam. It is a mandatory annual contribution of 2.5% on qualifying wealth held above the Nisab threshold for a full lunar year (Hawl).',
      answerUr: 'زکوٰۃ اسلام کے پانچ بنیادی ارکان میں سے ایک رکن ہے۔ یہ نصاب سے زائد رقم یا مال پر پورا قمری سال گزرنے کے بعد ۲.۵ فیصد واجب الادا صدقہ ہے۔',
      category: 'general'
    },
    {
      id: 'faq_2',
      questionEn: 'What is Nisab and why does its value change?',
      questionUr: 'نصاب کیا ہے اور اس کی مالیت کیوں تبدیل ہوتی ہے؟',
      answerEn: 'Nisab is the minimum threshold of wealth required before Zakat becomes due (87.48g gold or 612.36g silver). Its monetary value fluctuates daily with global market prices of gold and silver.',
      answerUr: 'نصاب وہ کم از کم شرعی مالیت ہے جس کے بعد زکوٰۃ فرض ہوتی ہے (۸۷.۴۸ گرام سونا یا ۶۱۲.۳۶ گرام چاندی)۔ اس کی نقد قیمت بین الاقوامی مارکیٹ میں سونے اور چاندی کے نرخوں کے ساتھ تبدیل ہوتی رہتی ہے۔',
      category: 'nisab'
    },
    {
      id: 'faq_3',
      questionEn: 'Why are there different Nisab methods (Gold vs Silver)?',
      questionUr: 'سونے اور چاندی کے نصاب میں فرق کیوں ہے؟',
      answerEn: 'Gold and Silver Nisab were historically equivalent in value. Over centuries, silver market value dropped significantly relative to gold. Scholars permit using either benchmark: Gold Nisab provides a higher threshold for general currency holders, while Silver Nisab provides a lower threshold that enables broader charity distribution.',
      answerUr: 'قدیم زمانے میں سونے اور چاندی کے نصاب کی مالیت ایک دوسرے کے برابر تھی۔ وقت کے ساتھ چاندی کی مارکیٹ قیمت کم ہو گئی۔ علماء کرام دونوں معیارات کو تسلیم کرتے ہیں۔',
      category: 'nisab'
    },
    {
      id: 'faq_4',
      questionEn: 'Is gold jewellery included in Zakat?',
      questionUr: 'کیا استعمال کے زیورات پر زکوٰۃ فرض ہے؟',
      answerEn: 'In the Hanafi school, all gold and silver jewellery above Nisab is zakatable regardless of whether it is worn or stored. In the Shafi\'i, Maliki, and Hanbali schools, reasonable personal-use non-extravagant jewellery is exempt.',
      answerUr: 'فقہ حنفی کے مطابق تمام سونا اور چاندی (خواہ استعمال میں ہو) قابلِ زکوٰۃ ہے۔ دیگر آئمہ کے نزدیک عام استعمال کے باقاعدہ زیورات زکوٰۃ سے مستثنیٰ ہیں۔',
      category: 'assets'
    },
    {
      id: 'faq_5',
      questionEn: 'Are debts deducted from my total assets?',
      questionUr: 'کیا قرضہ جات اثاثوں سے منہا کیے جاتے ہیں؟',
      answerEn: 'Immediate debts and short-term liabilities due within the current lunar year are deducted. For long-term loans (like multi-year mortgages), scholars recommend deducting only the upcoming 12-month installment payments.',
      answerUr: 'فوری اور ۱۲ ماہ کے اندر واجب الادا قرضے کل اثاثوں سے منہا کیے جاتے ہیں۔ طویل المدتی قرضوں کی صرف موجودہ سال کی اقساط منہا کی جاتی ہیں۔',
      category: 'assets'
    },
    {
      id: 'faq_6',
      questionEn: 'Do I need an account to use ZakatMint?',
      questionUr: 'کیا زکوٰۃ کیلکولیٹر استعمال کرنے کے لیے اکاؤنٹ بنانا ضروری ہے؟',
      answerEn: 'No! ZakatMint does not require any user account or registration. All calculations happen 100% on your local device and remain private.',
      answerUr: 'جی نہیں! زکوٰۃ کیلکولیٹر کے لیے کسی اکاؤنٹ کی بالکل ضرورت نہیں ہے۔ تمام معلومات آپ کے اپنے ڈیوائس پر ہی رہتی ہیں۔',
      category: 'privacy'
    },
    {
      id: 'faq_7',
      questionEn: 'Does ZakatMint issue a formal religious ruling (fatwa)?',
      questionUr: 'کیا زکوٰۃ کیلکولیٹر شرعی فتویٰ جاری کرتا ہے؟',
      answerEn: 'No. ZakatMint provides a mathematical estimate based on your entries and chosen methodology. It does not issue religious rulings (fatawa). For complex estate, corporate, or disputed matters, please consult a qualified scholar.',
      answerUr: 'جی نہیں، زکوٰۃ کیلکولیٹر صرف ایک ریاضیاتی تخمینہ فراہم کرتا ہے۔ یہ باقاعدہ شرعی فتویٰ نہیں ہے۔',
      category: 'general'
    }
  ];

  const filteredFaqs = faqs.filter((f) => {
    const q = lang === 'ur' ? f.questionUr : f.questionEn;
    const a = lang === 'ur' ? f.answerUr : f.answerEn;
    const search = searchTerm.toLowerCase();
    return q.toLowerCase().includes(search) || a.toLowerCase().includes(search);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold text-emerald-950 font-serif">
          {t.nav.faq}
        </h1>
        <p className="text-slate-600 text-base">
          Frequently asked questions about Zakat, Nisab thresholds, and asset eligibility.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={lang === 'ur' ? 'سوال کی تلاش کریں...' : 'Search questions or keywords...'}
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm font-medium shadow-xs focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
        />
      </div>

      {/* Accordion Cards */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No matching questions found. Try searching another term.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            const q = lang === 'ur' ? faq.questionUr : faq.questionEn;
            const a = lang === 'ur' ? faq.answerUr : faq.answerEn;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left font-bold text-slate-900 text-base flex items-center justify-between hover:bg-slate-50 transition-colors gap-4"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-800 shrink-0" />
                    <span>{q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50 animate-fadeIn">
                    {a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
