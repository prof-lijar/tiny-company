import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold text-blue-600">
            TOPIK <span className="text-slate-900">Assistant</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/vocabulary" className="hover:text-blue-600 transition-colors">Vocabulary</Link>
          <Link href="/grammar" className="hover:text-blue-600 transition-colors">Grammar</Link>
          <Link href="/reading" className="hover:text-blue-600 transition-colors">Reading</Link>
          <Link href="/writing" className="hover:text-blue-600 transition-colors">Writing</Link>
          <Link href="/writing/samples" className="hover:text-blue-600 transition-colors">Samples</Link>
          <Link href="/mock-test" className="hover:text-blue-600 transition-colors">Mock Test</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Sign In
          </Link>
          <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};
