import React, { useMemo, useState } from 'react';
import { QrCode, Truck, ShieldCheck } from 'lucide-react';

const gradeOptions = ['A', 'B', 'C'];

export default function DistributorDashboard({ batches = [], onUpdate }) {
  const [filter, setFilter] = useState('');

  const filtered = useMemo(() => {
    if (!filter) return batches;
    return batches.filter((b) =>
      [b.batchId, b.crop, b.farmer, b.location].some((v) => v?.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [batches, filter]);

  const updateOwner = (batchId) => {
    const batch = batches.find((b) => b.batchId === batchId);
    if (!batch) return;
    const nextOwner = batch.owner === 'Distributor' ? 'Retailer' : 'Distributor';
    const updated = {
      ...batch,
      owner: nextOwner,
      history: [...(batch.history || []), { role: nextOwner, name: nextOwner, at: new Date().toISOString() }],
    };
    onUpdate && onUpdate(updated);
  };

  const gradeBatch = (batchId) => {
    const batch = batches.find((b) => b.batchId === batchId);
    if (!batch) return;
    const nextGrade = gradeOptions[Math.floor(Math.random() * gradeOptions.length)];
    const updated = { ...batch, grade: `Grade ${nextGrade}` };
    onUpdate && onUpdate(updated);
  };

  return (
    <section id="distributor" className="scroll-mt-24">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Truck className="text-amber-600" /> Distributor / Retailer Dashboard
          </h2>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by Batch, Crop, Farmer..."
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="text-left p-3">Batch ID</th>
                <th className="text-left p-3">Crop</th>
                <th className="text-left p-3">Farmer</th>
                <th className="text-left p-3">Qty</th>
                <th className="text-left p-3">Location</th>
                <th className="text-left p-3">Current Owner</th>
                <th className="text-left p-3">Quality</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-slate-500">No batches yet. Register produce from the Farmer Panel.</td>
                </tr>
              )}
              {filtered.map((b) => (
                <tr key={b.batchId} className="border-t border-slate-100">
                  <td className="p-3 font-medium text-slate-800">{b.batchId}</td>
                  <td className="p-3">{b.crop}</td>
                  <td className="p-3">{b.farmer}</td>
                  <td className="p-3">{b.quantity}</td>
                  <td className="p-3">{b.location}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                      <Truck size={14} /> {b.owner || 'Distributor'}
                    </span>
                  </td>
                  <td className="p-3">
                    {b.grade ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                        <ShieldCheck size={14} /> {b.grade}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">Not graded</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateOwner(b.batchId)}
                        className="rounded-md border border-slate-300 px-3 py-1 text-xs hover:bg-slate-50"
                      >
                        Update Owner
                      </button>
                      <button
                        onClick={() => gradeBatch(b.batchId)}
                        className="rounded-md bg-amber-600 text-white px-3 py-1 text-xs hover:bg-amber-700"
                      >
                        AI Grade
                      </button>
                      <button
                        className="rounded-md border border-slate-300 px-3 py-1 text-xs hover:bg-slate-50 inline-flex items-center gap-1"
                        title="Scan/Show QR"
                      >
                        <QrCode size={14} /> QR
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
