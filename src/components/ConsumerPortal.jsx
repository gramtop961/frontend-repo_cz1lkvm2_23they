import React, { useMemo, useState } from 'react';
import { QrCode, ShieldCheck, Truck, Leaf } from 'lucide-react';

export default function ConsumerPortal({ batches = [] }) {
  const [query, setQuery] = useState('');

  const result = useMemo(() => batches.find((b) => b.batchId === query.trim()), [batches, query]);

  return (
    <section id="consumer" className="scroll-mt-24">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <QrCode className="text-indigo-600" /> Consumer Portal – Trace by QR/ID
          </h2>
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter or scan Batch ID (e.g., KT-...)"
              className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[260px]"
            />
            <button className="rounded-md bg-indigo-600 text-white px-3 py-2 text-sm hover:bg-indigo-700">Search</button>
          </div>
        </div>

        {!result ? (
          <div className="text-slate-500 text-sm">Enter a valid Batch ID from the dashboard to view its full history.</div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 rounded-lg border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-700 mb-2">Timeline</h3>
                <ol className="relative border-s border-slate-200">
                  {result.history?.map((h, idx) => (
                    <li key={idx} className="pl-6 py-3">
                      <div className="absolute -ml-3 mt-1.5 h-3 w-3 rounded-full bg-indigo-600"></div>
                      <div className="text-sm text-slate-700">
                        <span className="font-medium">{h.role}</span> → {h.name}
                      </div>
                      <div className="text-xs text-slate-500">{new Date(h.at).toLocaleString()}</div>
                    </li>
                  ))}
                  <li className="pl-6 py-3">
                    <div className="absolute -ml-3 mt-1.5 h-3 w-3 rounded-full bg-green-600"></div>
                    <div className="text-sm text-slate-700 flex items-center gap-1">
                      <Truck size={14} /> Current Owner: <span className="font-medium">{result.owner}</span>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="rounded-lg overflow-hidden border border-slate-200">
                <img src={result.imageUrl} alt="Produce" className="w-full h-44 object-cover" />
                <div className="p-3 text-xs text-slate-600">Proof-of-farm image</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-slate-200 p-4">
                <h4 className="font-semibold text-slate-700 mb-1">Batch</h4>
                <div className="text-sm text-slate-700 space-y-1">
                  <p><span className="font-medium">ID:</span> {result.batchId}</p>
                  <p><span className="font-medium">Crop:</span> {result.crop} &middot; <span className="font-medium">Qty:</span> {result.quantity}</p>
                  <p><span className="font-medium">Farmer:</span> {result.farmer} ({result.location})</p>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <h4 className="font-semibold text-slate-700 mb-1">Authenticity</h4>
                <div className="text-sm text-slate-700 space-y-1">
                  <p className="break-all flex items-center gap-2"><ShieldCheck className="text-green-600" size={16} /> {result.hash}</p>
                  <p className="text-xs text-slate-500">Blockchain-style hash (tamper-evident)</p>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <h4 className="font-semibold text-slate-700 mb-1">Quality & Price</h4>
                <div className="text-sm text-slate-700 space-y-1">
                  <p><span className="font-medium">Grade:</span> {result.grade || 'Pending'}</p>
                  <p><span className="font-medium">Farmer Price:</span> ${result.priceHistory?.farmer || 0}</p>
                  <p><span className="font-medium">Distributor Price:</span> ${result.priceHistory?.distributor || 0}</p>
                  <p><span className="font-medium">Retailer Price:</span> ${result.priceHistory?.retailer || 0}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-slate-500">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Leaf size={16} className="text-green-600" /> Scan QR in-store to auto-fill the Batch ID here.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
