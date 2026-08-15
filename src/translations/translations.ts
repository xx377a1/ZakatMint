import { Language } from '../types/zakat';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  disclaimerText: string;
  nav: {
    home: string;
    calculator: string;
    howItWorks: string;
    guide: string;
    faq: string;
    about: string;
    startCalculator: string;
    history: string;
  };
  hero: {
    title: string;
    subtitle: string;
    startBtn: string;
    howBtn: string;
    disclaimer: string;
  };
  features: {
    simpleTitle: string;
    simpleDesc: string;
    transparentTitle: string;
    transparentDesc: string;
    privateTitle: string;
    privateDesc: string;
  };
  howItWorksSection: {
    title: string;
    subtitle: string;
    step1: string;
    step1Desc: string;
    step2: string;
    step2Desc: string;
    step3: string;
    step3Desc: string;
    step4: string;
    step4Desc: string;
    step5: string;
    step5Desc: string;
  };
  eduSection: {
    title: string;
    zakatTitle: string;
    zakatDesc: string;
    nisabTitle: string;
    nisabDesc: string;
    hawlTitle: string;
    hawlDesc: string;
    assetsTitle: string;
    assetsDesc: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  calc: {
    progress: string;
    back: string;
    next: string;
    step1Title: string;
    step1Subtitle: string;
    step2Title: string;
    step2Subtitle: string;
    step3Title: string;
    step3Subtitle: string;
    step4Title: string;
    step4Subtitle: string;
    step5Title: string;
    step5Subtitle: string;
    step6Title: string;
    step6Subtitle: string;
    step7Title: string;
    step7Subtitle: string;
    step8Title: string;
    step8Subtitle: string;
    reviewTitle: string;
    reviewSubtitle: string;
    resultTitle: string;
    resultSubtitle: string;
  };
  labels: {
    currency: string;
    cashAtHome: string;
    cashAtBankCurrent: string;
    cashAtBankSavings: string;
    cashAtBankOther: string;
    recoverableLoans: string;
    moneyReceivable: string;
    subtotal: string;
    gold: string;
    silver: string;
    weight: string;
    unit: string;
    purity: string;
    pricePerGram: string;
    grams: string;
    ounces: string;
    tolas: string;
    goldValue: string;
    silverValue: string;
    shares: string;
    investmentFunds: string;
    crypto: string;
    otherInvestments: string;
    businessCash: string;
    tradingInventory: string;
    resaleGoods: string;
    tradeReceivables: string;
    otherBusinessAssets: string;
    addCustomAsset: string;
    assetName: string;
    assetAmount: string;
    assetDesc: string;
    shortTermDebts: string;
    immediateBills: string;
    otherLiabilities: string;
    totalLiabilities: string;
    goldNisab: string;
    silverNisab: string;
    methodology: string;
    hawlQuestion: string;
    yes: string;
    no: string;
    notSure: string;
    hawlNoWarning: string;
    hawlNotSureWarning: string;
    totalAssets: string;
    netWealth: string;
    nisabThreshold: string;
    estimatedZakat: string;
    aboveNisab: string;
    aboveNisabMsg: string;
    belowNisab: string;
    belowNisabMsg: string;
    edit: string;
    calculateBtn: string;
    startNew: string;
    printResults: string;
    downloadPdf: string;
    shareSummary: string;
    saveToHistory: string;
    howCalculated: string;
    useMarketPrices: string;
    livePricesSource: string;
    lastUpdated: string;
    manualPricePrompt: string;
  };
  history: {
    title: string;
    empty: string;
    savedOn: string;
    view: string;
    delete: string;
    rename: string;
    deleteAll: string;
    savedSuccess: string;
  };
  footer: {
    motto: string;
    quickLinks: string;
    legal: string;
    privacy: string;
    terms: string;
    disclaimerNotice: string;
    allRightsReserved: string;
  }
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'ZakatMint',
    tagline: 'Calculate Your Zakat With Confidence',
    disclaimerText: 'This calculator provides an estimate based on entered figures and selected Nisab methodology. It does not replace personal advice from a qualified Islamic scholar.',
    nav: {
      home: 'Home',
      calculator: 'Calculator',
      howItWorks: 'How It Works',
      guide: 'Zakat Guide',
      faq: 'FAQ',
      about: 'About',
      startCalculator: 'Start Calculator',
      history: 'Saved Calculations'
    },
    hero: {
      title: 'Calculate Your Zakat With Confidence',
      subtitle: 'A simple, transparent, and private calculator to help estimate your Zakat based on your selected methodology and Nisab.',
      startBtn: 'Start Calculating',
      howBtn: 'How It Works',
      disclaimer: 'This calculator provides an estimate and does not replace advice from a qualified Islamic scholar.'
    },
    features: {
      simpleTitle: 'Simple',
      simpleDesc: 'Enter your assets and eligible liabilities step by step with clear explanations.',
      transparentTitle: 'Transparent',
      transparentDesc: 'See exactly how your estimated Zakat is calculated with clear rate breakdowns.',
      privateTitle: 'Private',
      privateDesc: 'Your financial information stays strictly on your device. No account required.'
    },
    howItWorksSection: {
      title: 'How It Works',
      subtitle: 'Five simple steps to calculate your annual Zakat obligation accurately.',
      step1: '1. Enter Assets',
      step1Desc: 'Input cash, bank balances, gold, silver, investments, and trade goods.',
      step2: '2. Enter Liabilities',
      step2Desc: 'Deduct short-term debts and immediate financial obligations currently due.',
      step3: '3. Select Nisab',
      step3Desc: 'Choose Gold or Silver Nisab threshold based on live or reference metal prices.',
      step4: '4. Calculate',
      step4Desc: 'Review your Net Zakatable Wealth compared against the Nisab threshold.',
      step5: '5. Review & Export',
      step5Desc: 'View your 2.5% Zakat estimate, print statement, or save to local history.'
    },
    eduSection: {
      title: 'Understanding Zakat Fundamentals',
      zakatTitle: 'What is Zakat?',
      zakatDesc: 'Zakat is one of the Five Pillars of Islam. It is a mandatory annual charitable contribution (2.5%) paid by eligible Muslims on wealth held above the Nisab threshold for a full lunar year.',
      nisabTitle: 'What is Nisab?',
      nisabDesc: 'Nisab is the minimum threshold of wealth a Muslim must possess before Zakat becomes due. It is historically defined as 87.48 grams of gold or 612.36 grams of silver.',
      hawlTitle: 'What is Hawl?',
      hawlDesc: 'Hawl refers to one full Hijri (lunar) year (approx. 354 days) during which the minimum Nisab wealth has remained continuously in your possession.',
      assetsTitle: 'Zakatable Assets',
      assetsDesc: 'Assets subject to Zakat include cash, savings, gold, silver, stocks, investment funds, trade inventory, and recoverable business debts.'
    },
    cta: {
      title: 'Ready to calculate your Zakat?',
      subtitle: 'Start your confidential, step-by-step Zakat calculation in seconds.',
      button: 'Start Calculator'
    },
    calc: {
      progress: 'Step',
      back: 'Back',
      next: 'Next',
      step1Title: 'Select Preferred Currency',
      step1Subtitle: 'Choose your local currency for asset valuation and metal rates.',
      step2Title: 'Cash & Liquid Savings',
      step2Subtitle: 'Include cash on hand, bank balances, and money owed to you.',
      step3Title: 'Gold & Silver Holdings',
      step3Subtitle: 'Specify weight, purity, and unit for gold and silver items.',
      step4Title: 'Investments & Shares',
      step4Subtitle: 'Include shares, mutual funds, crypto, and investment dividends.',
      step5Title: 'Business & Trade Assets',
      step5Subtitle: 'Include business cash, inventory for resale, and trade receivables.',
      step6Title: 'Other Zakatable Assets',
      step6Subtitle: 'Add any custom or additional zakatable assets.',
      step7Title: 'Eligible Liabilities & Debts',
      step7Subtitle: 'Deduct short-term debts and immediate bills currently due.',
      step8Title: 'Nisab Basis & Hawl',
      step8Subtitle: 'Select Nisab threshold method and confirm Hawl duration.',
      reviewTitle: 'Review Your Financial Summary',
      reviewSubtitle: 'Confirm all entries before performing final Zakat calculation.',
      resultTitle: 'Zakat Calculation Results',
      resultSubtitle: 'Your detailed Zakat obligation breakdown based on selected parameters.'
    },
    labels: {
      currency: 'Currency',
      cashAtHome: 'Cash at Home & On Hand',
      cashAtBankCurrent: 'Bank Current Account Balance',
      cashAtBankSavings: 'Bank Savings Account Balance',
      cashAtBankOther: 'Other Bank / Wallet Balances',
      recoverableLoans: 'Recoverable Personal Loans Given',
      moneyReceivable: 'Money Receivable / Due Soon',
      subtotal: 'Subtotal',
      gold: 'Gold',
      silver: 'Silver',
      weight: 'Weight',
      unit: 'Unit',
      purity: 'Gold Purity / Carat',
      pricePerGram: 'Price per Gram',
      grams: 'Grams (g)',
      ounces: 'Ounces (oz)',
      tolas: 'Tolas (tola)',
      goldValue: 'Gold Total Value',
      silverValue: 'Silver Total Value',
      shares: 'Stocks & Shares (Trading or Market Value)',
      investmentFunds: 'Mutual Funds / Sukuk / ETFs',
      crypto: 'Cryptocurrency / Digital Assets',
      otherInvestments: 'Other Zakatable Investments',
      businessCash: 'Cash Held in Business Accounts',
      tradingInventory: 'Trading Inventory & Merchandise',
      resaleGoods: 'Finished Goods Held for Resale',
      tradeReceivables: 'Business Trade Receivables',
      otherBusinessAssets: 'Other Eligible Business Assets',
      addCustomAsset: '+ Add Custom Asset',
      assetName: 'Asset Name / Description',
      assetAmount: 'Amount / Value',
      assetDesc: 'Notes / Context',
      shortTermDebts: 'Short-term Debts Due Immediately',
      immediateBills: 'Immediate Outstanding Household Bills',
      otherLiabilities: 'Other Deductible Liabilities',
      totalLiabilities: 'Total Eligible Liabilities',
      goldNisab: 'Gold Nisab (87.48 grams of 24K Gold)',
      silverNisab: 'Silver Nisab (612.36 grams of Pure Silver)',
      methodology: 'Calculation Methodology',
      hawlQuestion: 'Has a full lunar year (Hawl) completed on this wealth?',
      yes: 'Yes, Hawl Completed',
      no: 'No, Hawl Not Completed',
      notSure: 'I am Not Sure',
      hawlNoWarning: 'Note: Zakat is generally due only after wealth above Nisab is maintained for a full lunar year (Hawl).',
      hawlNotSureWarning: 'Consider consulting a qualified scholar to verify whether your Hawl has been completed.',
      totalAssets: 'Total Zakatable Assets',
      netWealth: 'Net Zakatable Wealth',
      nisabThreshold: 'Selected Nisab Threshold',
      estimatedZakat: 'Estimated Zakat Due (2.5%)',
      aboveNisab: 'Above Nisab Threshold',
      aboveNisabMsg: 'Your Net Zakatable Wealth exceeds the selected Nisab threshold. Zakat is due.',
      belowNisab: 'Below Nisab Threshold',
      belowNisabMsg: 'Your Net Zakatable Wealth is below the selected Nisab threshold. No Zakat is due.',
      edit: 'Edit Section',
      calculateBtn: 'Calculate Zakat Now',
      startNew: 'Start New Calculation',
      printResults: 'Print Statement',
      downloadPdf: 'Download PDF Report',
      shareSummary: 'Share Summary',
      saveToHistory: 'Save to Local History',
      howCalculated: 'How Was This Calculated?',
      useMarketPrices: 'Market Metal Rates',
      livePricesSource: 'Data Source',
      lastUpdated: 'Last Updated',
      manualPricePrompt: 'Override with custom rate'
    },
    history: {
      title: 'Saved Calculation History',
      empty: 'No saved calculations found in local storage.',
      savedOn: 'Saved on',
      view: 'View Calculation',
      delete: 'Delete',
      rename: 'Rename',
      deleteAll: 'Delete All History',
      savedSuccess: 'Calculation successfully saved to local history.'
    },
    footer: {
      motto: 'Simple, transparent, and private Zakat calculation tools.',
      quickLinks: 'Quick Links',
      legal: 'Legal & Privacy',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      disclaimerNotice: 'Disclaimer: ZakatMint provides an estimate based on user inputs and selected methodology. It does not constitute a formal religious ruling (fatwa). Please consult a scholar for complex situations.',
      allRightsReserved: 'All rights reserved.'
    }
  },
  ur: {
    appName: 'زکوٰۃ کیلکولیٹر',
    tagline: 'اعتماد کے ساتھ اپنی زکوٰۃ کا حساب لگائیں',
    disclaimerText: 'یہ کیلکولیٹر آپ کے فراہم کردہ اعداد و شمار اور منتخب نصاب کے مطابق ایک تخمینہ فراہم کرتا ہے۔ حتمی شرعی رہنمائی کے لیے جید علمائے کرام سے رجوع کریں۔',
    nav: {
      home: 'صفحہ اول',
      calculator: 'کیلکولیٹر',
      howItWorks: 'طریقہ کار',
      guide: 'رہنمائے زکوٰۃ',
      faq: 'سوال و جواب',
      about: 'ہمارے بارے میں',
      startCalculator: 'حساب شروع کریں',
      history: 'محفوظ شدہ حساب'
    },
    hero: {
      title: 'اعتماد کے ساتھ اپنی زکوٰۃ کا حساب لگائیں',
      subtitle: 'ایک آسان، شفاف اور مکمل طور پر نجی زکوٰۃ کیلکولیٹر جو آپ کی منتخب کردہ نصاب کی بنیاد پر درست تخمینہ فراہم کرتا ہے۔',
      startBtn: 'حساب شروع کریں',
      howBtn: 'طریقہ کار دیکھیں',
      disclaimer: 'یہ کیلکولیٹر صرف تخمینہ فراہم کرتا ہے اور جید علماء کی ذاتی مشاورت کا متبادل نہیں ہے۔'
    },
    features: {
      simpleTitle: 'آسان اور سادہ',
      simpleDesc: 'قدم بہ قدم اپنے اثاثے اور واجب الادا قرضہ جات درج کریں۔',
      transparentTitle: 'مکمل شفافیت',
      transparentDesc: 'دیکھیں کہ آپ کی زکوٰۃ کا حساب کس فارمولے اور شرح کے تحت ہوا ہے۔',
      privateTitle: 'مکمل راز داری',
      privateDesc: 'آپ کی مالی معلومات آپ کے ڈیوائس پر ہی محفوظ رہتی ہیں۔ کسی اکاؤنٹ کی ضرورت نہیں ہے۔'
    },
    howItWorksSection: {
      title: 'زکوٰۃ کا حساب لگانے کا طریقہ',
      subtitle: 'پانچ آسان مراحل میں اپنی سالانہ زکوٰۃ کا درست تخمینہ لگائیں۔',
      step1: '۱. اثاثے درج کریں',
      step1Desc: 'نقد رقم، بینک میں موجود بچت، سونا، چاندی، حصص اور تجارتی مال درج کریں۔',
      step2: '۲. واجبات اور قرضہ جات',
      step2Desc: 'فوری واجب الادا قرضے اور بل منفی کریں۔',
      step3: '۳. نصاب کا انتخاب',
      step3Desc: 'سونے یا چاندی کے نصاب کی قیمت منتخب کریں۔',
      step4: '۴. زکوٰۃ کا حساب',
      step4Desc: 'اپنے قابلِ زکوٰۃ مال کا نصاب سے موازنہ دیکھیں۔',
      step5: '۵. تصدیق و پرنٹ',
      step5Desc: '۲.۵ فیصد کے حساب سے اپنی زکوٰۃ دیکھیں، پی ڈی ایف بنائیں یا محفوظ کریں۔'
    },
    eduSection: {
      title: 'زکوٰۃ کی شرعی بنیادیں',
      zakatTitle: 'زکوٰۃ کیا ہے؟',
      zakatDesc: 'زکوٰۃ اسلام کا بنیادی رکن ہے۔ یہ نصاب سے زائد مال پر پورا قمری سال گزرنے کے بعد ۲.۵ فیصد واجب الادا صدقہ ہے۔',
      nisabTitle: 'نصاب سے کیا مراد ہے؟',
      nisabDesc: 'نصاب وہ کم از کم شرعی حد ہے جس کا مالک ہونا زکوٰۃ کی فرضیت کا سبب بنتا ہے۔ یہ ۸۷.۴۸ گرام سونا یا ۶۱۲.۳۶ گرام چاندی ہے۔',
      hawlTitle: 'حول (سال کی مدت) کیا ہے؟',
      hawlDesc: 'حول سے مراد ایک مکمل قمری سال (تقریباً ۳۵۴ دن) ہے جس کے دوران نصاب کی مقدار مال آپ کی ملکیت میں مستقل موجود رہے۔',
      assetsTitle: 'قابلِ زکوٰۃ اثاثے',
      assetsDesc: 'نقد رقم، بینک ڈیپازٹس، سونا، چاندی، کاروباری اسٹاک، حصص اور قابلِ وصول تجارتی قرضے۔'
    },
    cta: {
      title: 'کیا آپ اپنی زکوٰۃ کا حساب لگانے کے لیے تیار ہیں؟',
      subtitle: 'چند سیکنڈوں میں اپنا نجی اور درست زکوٰۃ حساب شروع کریں۔',
      button: 'حساب شروع کریں'
    },
    calc: {
      progress: 'مرحلہ',
      back: 'پیچھے',
      next: 'آگے بڑھیں',
      step1Title: 'کرنسی کا انتخاب کریں',
      step1Subtitle: 'اپنے اثاثوں اور دھاتوں کے نرخوں کے لیے اپنی مقامی کرنسی منتخب کریں۔',
      step2Title: 'نقد رقم اور بچت',
      step2Subtitle: 'گھر میں موجود نقد رقم، بینک بیلنس اور قابلِ وصول رقم درج کریں۔',
      step3Title: 'سونا اور چاندی',
      step3Subtitle: 'سونے اور چاندی کا وزن، عیار (قیراط) اور فی گرام قیمت درج کریں۔',
      step4Title: 'سرمایہ کاری اور شیئرز',
      step4Subtitle: 'اسٹاکس، میوچل فنڈز، کرپٹو اور دیگر سرمایہ کاری شامل کریں۔',
      step5Title: 'کاروباری اثاثے',
      step5Subtitle: 'کاروباری کیش، تجارتی سامانِ تجارت اور وصولی داریاں درج کریں۔',
      step6Title: 'دیگر قابلِ زکوٰۃ اثاثے',
      step6Subtitle: 'کوئی دیگر خاص یا اضافی اثاثہ شامل کریں۔',
      step7Title: 'واجب الادا قرضے اور لاگت',
      step7Subtitle: 'فوری واجب الادا قرضے اور جاری اخراجات منہا کریں۔',
      step8Title: 'نصاب اور حول (سال)',
      step8Subtitle: 'نصاب کا معیار منتخب کریں اور ایک سال مکمل ہونے کی تصدیق کریں۔',
      reviewTitle: 'اپنے اعداد و شمار کا جائزہ لیں',
      reviewSubtitle: 'حتمی حساب سے پہلے تمام اندراجات کی تصدیق کر لیں۔',
      resultTitle: 'زکوٰۃ کے نتائج',
      resultSubtitle: 'آپ کے درج کردہ مال کی بنیاد پر زکوٰۃ کی حتمی مقدار۔'
    },
    labels: {
      currency: 'کرنسی',
      cashAtHome: 'گھر پر موجود نقد رقم',
      cashAtBankCurrent: 'بینک کرنٹ اکاؤنٹ',
      cashAtBankSavings: 'بینک سیونگ اکاؤنٹ',
      cashAtBankOther: 'دیگر بینک یا ڈیجیٹل والٹ',
      recoverableLoans: 'دیے گئے قابلِ وصول ذاتی قرضے',
      moneyReceivable: 'قابلِ وصول رقوم',
      subtotal: 'ذیلی مجموعہ',
      gold: 'سونا',
      silver: 'چاندی',
      weight: 'وزن',
      unit: 'پیمائش کا یونٹ',
      purity: 'سونے کا عیار (قیراط)',
      pricePerGram: 'قیمت فی گرام',
      grams: 'گرام',
      ounces: 'اونس',
      tolas: 'تولہ',
      goldValue: 'سونے کی کل مالیت',
      silverValue: 'چاندی کی کل مالیت',
      shares: 'شیئرز اور اسٹاکس (تجارتی مالیت)',
      investmentFunds: 'میوچل فنڈز / صکوک / ای ٹی ایف',
      crypto: 'کرپٹو کرنسی / ڈیجیٹل اثاثے',
      otherInvestments: 'دیگر قابلِ زکوٰۃ سرمایہ کاری',
      businessCash: 'کاروباری اکاؤنٹ میں موجود نقد',
      tradingInventory: 'تجارتی مالِ تجارت (اسٹاک)',
      resaleGoods: 'فروخت کے لیے تیار سامان',
      tradeReceivables: 'کاروباری قابلِ وصول رقم',
      otherBusinessAssets: 'دیگر تجارتی اثاثے',
      addCustomAsset: '+ نیا اثاثہ شامل کریں',
      assetName: 'اثاثے کا نام',
      assetAmount: 'مالیت / رقم',
      assetDesc: 'تفصیل',
      shortTermDebts: 'فوری واجب الادا مقروض رقم',
      immediateBills: 'واجب الادا گھریلو یا کاروباری بل',
      otherLiabilities: 'دیگر منہا ہونے والی کٹوتی',
      totalLiabilities: 'کل منہا ہونے والے قرضے',
      goldNisab: 'سونے کا نصاب (۸۷.۴۸ گرام ۲۴ قیراط سونا)',
      silverNisab: 'چاندی کا نصاب (۶۱۲.۳۶ گرام خالص چاندی)',
      methodology: 'فقہی طریقہ کار',
      hawlQuestion: 'کیا اس مال پر پورا ایک قمری سال (حول) گزر چکا ہے؟',
      yes: 'جی ہاں، ایک سال مکمل ہو گیا ہے',
      no: 'جی نہیں، ابھی سال مکمل نہیں ہوا',
      notSure: 'مجھے یقین نہیں ہے',
      hawlNoWarning: 'نوٹ: زکوٰۃ عام طور پر نصاب پر پورا ایک سال مکمل ہونے کے بعد فرض ہوتی ہے۔',
      hawlNotSureWarning: 'اس بات کی تصدیق کے لیے کہ آیا آپ کا حول مکمل ہو چکا ہے، کسی عالمِ دین سے رجوع کریں۔',
      totalAssets: 'کل قابلِ زکوٰۃ اثاثے',
      netWealth: 'خالص قابلِ زکوٰۃ مالیت',
      nisabThreshold: 'منتخب کردہ نصاب کی مالیت',
      estimatedZakat: 'قابلِ ادا زکوٰۃ (۲.۵ فیصد)',
      aboveNisab: 'نصاب سے زیادہ',
      aboveNisabMsg: 'آپ کا خالص مال منتخب نصاب کی حد سے زیادہ ہے۔ زکوٰۃ فرض ہے۔',
      belowNisab: 'نصاب سے کم',
      belowNisabMsg: 'آپ کا خالص مال منتخب نصاب کی حد سے کم ہے۔ زکوٰۃ فرض نہیں ہے۔',
      edit: 'تبدیلی کریں',
      calculateBtn: 'زکوٰۃ کا حساب لگائیں',
      startNew: 'نیا حساب شروع کریں',
      printResults: 'پرنٹ پرچہ',
      downloadPdf: 'پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں',
      shareSummary: 'شیئر کریں',
      saveToHistory: 'ہسٹری میں محفوظ کریں',
      howCalculated: 'اس کا حساب کیسے لگایا گیا؟',
      useMarketPrices: 'دھاتوں کے مارکیٹ نرخ',
      livePricesSource: 'ڈیٹا ذریعہ',
      lastUpdated: 'آخری اپ ڈیٹ',
      manualPricePrompt: 'اپنی مرضی کا نرخ درج کریں'
    },
    history: {
      title: 'محفوظ شدہ حسابات',
      empty: 'لوکل ہسٹری میں کوئی محفوظ حساب موجود نہیں ہے۔',
      savedOn: 'محفوظ کیا گیا تاریخ:',
      view: 'حساب دیکھیں',
      delete: 'حذف کریں',
      rename: 'نام تبدیل کریں',
      deleteAll: 'تمام ہسٹری پاک کریں',
      savedSuccess: 'حساب لوکل ہسٹری میں کاملیت کے ساتھ محفوظ ہو گیا ہے۔'
    },
    footer: {
      motto: 'سادہ، شفاف اور نجی زکوٰۃ کیلکولیٹر۔',
      quickLinks: 'فوری لنکس',
      legal: 'قانونی اور نجی حقوق',
      privacy: 'پرائیویسی پالیسی',
      terms: 'شرائط و ضوابط',
      disclaimerNotice: 'تنبیہ: زکوٰۃ کیلکولیٹر صارف کے فراہم کردہ اعداد و شمار کے مطابق ایک تخمینہ پیش کرتا ہے۔ یہ باضابطہ فتویٰ نہیں ہے۔ پیچیدہ مسائل میں جید علمائے کرام سے رجوع کریں۔',
      allRightsReserved: 'جملہ حقوق محفوظ ہیں۔'
    }
  }
};
