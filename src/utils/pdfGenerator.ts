import { jsPDF } from 'jspdf';
import { formatCurrency } from '../constants/currencies';
import { ZakatResult, ZakatFormData, Language } from '../types/zakat';

export function generateZakatPdf(
  formData: ZakatFormData,
  result: ZakatResult,
  lang: Language = 'en'
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const currency = formData.currency;
  const isUrdu = lang === 'ur';

  // Branding colors
  const primaryGreen = '#064E3B'; // Emerald 900
  const goldAccent = '#D97706'; // Amber 600

  // Header Banner
  doc.setFillColor(6, 78, 59); // Emerald 900
  doc.rect(0, 0, 210, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('ZakatMint Statement', 15, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Date: ${new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })} | Privacy Status: Client-Side Only`,
    15,
    26
  );

  let y = 48;

  // Key Summary Box
  doc.setFillColor(240, 253, 244); // Light emerald bg
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(15, y, 180, 35, 3, 3, 'FD');

  doc.setTextColor(6, 78, 59);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('ESTIMATED ZAKAT DUE (2.5%)', 22, y + 10);

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(formatCurrency(result.estimatedZakat, currency), 22, y + 22);

  doc.setFontSize(10);
  doc.setTextColor(120, 53, 15);
  doc.text(
    result.isAboveNisab
      ? '✓ Net Zakatable Wealth meets Nisab Threshold'
      : '✕ Net Zakatable Wealth is below Nisab Threshold',
    110,
    y + 22
  );

  y += 45;

  // Financial Breakdown Section
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Wealth & Asset Summary', 15, y);

  y += 8;

  const b = result.breakdown;

  const rows = [
    ['Cash & Bank Savings', formatCurrency(b.cashSubtotal, currency)],
    ['Gold Holdings', formatCurrency(b.goldSubtotal, currency)],
    ['Silver Holdings', formatCurrency(b.silverSubtotal, currency)],
    ['Shares & Investments', formatCurrency(b.investmentsSubtotal, currency)],
    ['Business Assets & Inventory', formatCurrency(b.businessSubtotal, currency)],
    ['Other Zakatable Assets', formatCurrency(b.customSubtotal, currency)],
    ['TOTAL ASSETS', formatCurrency(b.totalAssets, currency)],
    ['LESS: Eligible Liabilities', `- ${formatCurrency(b.totalLiabilities, currency)}`],
    ['NET ZAKATABLE WEALTH', formatCurrency(b.netZakatableWealth, currency)]
  ];

  doc.setFontSize(10);
  rows.forEach(([label, value], idx) => {
    const isTotal = label.startsWith('TOTAL') || label.startsWith('NET');
    
    if (isTotal) {
      doc.setFillColor(241, 245, 249);
      doc.rect(15, y - 4, 180, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(6, 78, 59);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
    }

    doc.text(label, 20, y);
    doc.text(value, 190, y, { align: 'right' });
    y += 8;
  });

  y += 6;

  // Nisab Reference Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Nisab Threshold Details', 15, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);

  const nisabMethod = result.nisabBasis === 'gold' ? 'Gold Nisab (87.48g 24K)' : 'Silver Nisab (612.36g Pure Silver)';
  doc.text(`Selected Nisab Basis: ${nisabMethod}`, 20, y);
  y += 6;
  doc.text(`Nisab Monetary Threshold: ${formatCurrency(result.nisabThresholdValue, currency)}`, 20, y);
  y += 6;
  doc.text(`Hawl (1 Lunar Year) Status: ${formData.hawlStatus === 'yes' ? 'Completed (Yes)' : formData.hawlStatus === 'no' ? 'Not Completed (No)' : 'Uncertain'}`, 20, y);

  // Footer Disclaimer
  y = 265;
  doc.setDrawColor(226, 232, 240);
  doc.line(15, y, 195, y);

  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Disclaimer: ZakatMint provides an estimate based on user-provided figures and selected methodology.', 15, y);
  doc.text('This calculation does not substitute personal consultation with a qualified Islamic scholar.', 15, y + 4);

  doc.save(`ZakatMint_Statement_${new Date().toISOString().split('T')[0]}.pdf`);
}
