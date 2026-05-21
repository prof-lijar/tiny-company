import React from 'react';
import { Inter, Noto_Sans_KR } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import './globals.css';

export const metadata = {
  title: 'TOPIK Learning Assistant | Master the Korean Proficiency Test',
  description: 'The ultimate study platform for TOPIK II (Levels 3-6). Vocabulary with SRS, grammar lessons, and AI-powered writing feedback.',
};

const inter = Inter({ subsets: ['latin'] });
const notoSansKr = Noto_Sans_KR({ 
  weight: ['400', '700'], 
  subsets: ['latin'],
  variable: '--font-noto-sans-kr'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} ${notoSansKr.variable} font-sans antialiased text-slate-900 bg-slate-50`}>
        <Header />
        <main>{children}</main>
        <footer className="border-t border-slate-200 bg-white py-12 mt-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} TOPIK Learning Assistant. All rights reserved.
            </p>
            <div className="flex justify-center gap-6 mt-4 text-sm text-slate-400">
              <a href="#" className="hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600">Terms of Service</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
