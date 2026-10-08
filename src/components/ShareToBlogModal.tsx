import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Globe,
  Code2,
  ExternalLink,
  AlertTriangle,
  BookOpen,
  Info,
  X
} from 'lucide-react';

interface ShareToBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareToBlogModal: React.FC<ShareToBlogModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedIframe, setCopiedIframe] = useState(false);
  const [copiedButtonCode, setCopiedButtonCode] = useState(false);

  if (!isOpen) return null;

  // Primary shared URL (publicly accessible by everyone without login)
  const sharedUrl =
    typeof window !== 'undefined' && window.location.origin.includes('run.app')
      ? window.location.origin.replace('ais-dev-', 'ais-pre-')
      : 'https://ais-pre-sev4u6s4ad4x7iyphldxqp-748783421637.asia-southeast1.run.app';

  // Responsive iframe embed code for Blogger / WordPress
  const iframeEmbedCode = `<div style="position:relative; width:100%; height:820px; overflow:hidden; border-radius:12px; box-shadow:0 4px 16px rgba(0,0,0,0.08); border:1px solid #e2e8f0;">
  <iframe 
    src="${sharedUrl}" 
    title="Aplikasi Penyusun Soal Sumatif SD Kurikulum Merdeka"
    width="100%" 
    height="100%" 
    style="border:none;"
    loading="lazy"
    allow="clipboard-write; fullscreen">
  </iframe>
</div>`;

  // Alternative button link HTML for blog post
  const buttonEmbedCode = `<div style="text-align:center; margin:24px 0;">
  <a href="${sharedUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block; background:linear-gradient(135deg, #2563eb, #4f46e5); color:#ffffff; font-family:sans-serif; font-size:15px; font-weight:bold; padding:12px 24px; border-radius:8px; text-decoration:none; box-shadow:0 4px 12px rgba(37,99,235,0.25);">
    📝 Buka Aplikasi Penyusun Soal Sumatif SD (Online Gratis)
  </a>
  <p style="font-size:12px; color:#64748b; margin-top:6px;">Berstandar Kurikulum Merdeka • Kelas 1 - 6 SD • Dilengkapi Kunci, Rubrik &amp; Ekspor Word DOCX</p>
</div>`;

  const copyToClipboard = (text: string, type: 'link' | 'iframe' | 'button') => {
    navigator.clipboard.writeText(text);
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else if (type === 'iframe') {
      setCopiedIframe(true);
      setTimeout(() => setCopiedIframe(false), 2000);
    } else {
      setCopiedButtonCode(true);
      setTimeout(() => setCopiedButtonCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Share2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">
                Bagikan / Sematkan Aplikasi ke Blog
              </h2>
              <p className="text-xs text-blue-100">
                Panduan resmi memasang aplikasi ke Blogger (Blogspot), WordPress, atau Web Sekolah
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-sm">
          {/* Explanation Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Penyebab kendala: </span>
              Pesan <em>"Unexpected token 'T', 'The page c'... is not valid JSON"</em> biasanya muncul jika:
              <ul className="list-disc ml-4 mt-1 space-y-0.5 text-amber-800">
                <li>Menggunakan tautan internal pengembang (<code>ais-dev-...</code>) yang memblokir akses publik dengan halaman "The page cannot be found".</li>
                <li>Menempel tautan ke gadget/widget blog yang meminta feed JSON, bukan HTML iframe.</li>
              </ul>
              <span className="font-semibold block mt-1 text-emerald-800">
                ✅ Solusi: Gunakan tautan publik bersama (<code>ais-pre-...</code>) atau kode sematan iframe resmi di bawah ini.
              </span>
            </div>
          </div>

          {/* Option 1: Direct Public Link */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-600" />
                1. Tautan Publik Resmi (Dapat dibuka siapa saja)
              </div>
              <a
                href={sharedUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
              >
                Uji Tautan <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={sharedUrl}
                className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none"
              />
              <button
                onClick={() => copyToClipboard(sharedUrl, 'link')}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Tersalin!' : 'Salin URL'}</span>
              </button>
            </div>
          </div>

          {/* Option 2: Responsive Iframe Code */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-indigo-600" />
                2. Kode Sematan Iframe (Aplikasi Tampil Langsung di Dalam Blog)
              </div>
              <button
                onClick={() => copyToClipboard(iframeEmbedCode, 'iframe')}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedIframe ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIframe ? 'Tersalin!' : 'Salin Kode Iframe'}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={4}
              value={iframeEmbedCode}
              className="w-full bg-slate-900 text-slate-100 p-2.5 rounded-lg text-xs font-mono focus:outline-none"
            />
            <p className="text-[11px] text-slate-500">
              * Aplikasi otomatis menyesuaikan lebar halaman artikel blog Anda secara responsif.
            </p>
          </div>

          {/* Option 3: Button Link HTML */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                3. Tombol Tautan Cantik untuk Artikel Blog
              </div>
              <button
                onClick={() => copyToClipboard(buttonEmbedCode, 'button')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedButtonCode ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedButtonCode ? 'Tersalin!' : 'Salin Kode Tombol'}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={3}
              value={buttonEmbedCode}
              className="w-full bg-slate-900 text-slate-100 p-2.5 rounded-lg text-xs font-mono focus:outline-none"
            />
          </div>

          {/* Step by step guide for Blogger */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2 text-xs text-blue-900">
            <div className="font-bold flex items-center gap-1.5 text-blue-800">
              <Info className="w-4 h-4 text-blue-600" />
              Cara Memasang di Blogger (Blogspot):
            </div>
            <ol className="list-decimal ml-4 space-y-1 text-slate-700">
              <li>Masuk ke dasbor <strong>Blogger</strong> Anda dan klik <strong>Posting Baru</strong>.</li>
              <li>Di pojok kiri atas bilah penyunting tulisan, klik ikon pensil lalu pilih <strong>Tampilan HTML</strong> (bukan Tampilan Menulis).</li>
              <li>Tempel (Paste) kode <strong>Iframe</strong> atau kode <strong>Tombol Tautan</strong> di atas ke dalam artikel.</li>
              <li>Klik <strong>Publikasikan</strong>. Aplikasi kini dapat langsung diakses pengunjung blog Anda!</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs rounded-lg transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
