import React from 'react';
import { Leaf, QrCode, Truck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-semibold text-slate-800">
          <Leaf className="text-green-600" size={22} />
          <span>KrishiTrace</span>
        </a>
        <nav className="flex items-center gap-4 text-sm">
          <a href="#farmer" className="text-slate-600 hover:text-slate-900">Farmer</a>
          <a href="#distributor" className="text-slate-600 hover:text-slate-900 flex items-center gap-1">
            <Truck size={16} />
            <span>Distributor</span>
          </a>
          <a href="#consumer" className="text-slate-600 hover:text-slate-900 flex items-center gap-1">
            <QrCode size={16} />
            <span>Consumer</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
