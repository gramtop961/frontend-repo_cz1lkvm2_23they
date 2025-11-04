import React, { useState } from 'react';
import { ShieldCheck, Camera } from 'lucide-react';

// Utility: simple SHA-256 using Web Crypto
async function sha256(message) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export default function FarmerForm({ onRegister }) {
  const [form, setForm] = useState({ crop: '', quantity: '', farmer: '', location: '' });
  const [receipt, setReceipt] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const timestamp = new Date().toISOString();
    const batchId = `KT-${Date.now().toString().slice(-6)}-${Math.floor(Math.random()*9000+1000)}`;
    const payload = `${form.crop}|${form.quantity}|${form.farmer}|${form.location}|${timestamp}`;
    const hash = await sha256(payload);

    const record = {
      batchId,
      crop: form.crop,
      quantity: form.quantity,
      farmer: form.farmer,
      location: form.location,
      timestamp,
      hash,
      owner: 'Distributor',
      grade: null,
      priceHistory: {
        farmer: 0,
        distributor: 0,
        retailer: 0,
      },
      imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1200&auto=format&fit=crop',
      history: [
        { role: 'Farmer', name: form.farmer || 'Unknown', at: timestamp },
      ],
    };

    setReceipt({ ...record });
    onRegister && onRegister(record);
    setSubmitting(false);
    setForm({ crop: '', quantity: '', farmer: '', location: '' });
  };

  return (
    <section id="farmer" className="scroll-mt-24">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Farmer Panel – Simulated SMS Input</h2>
          <ShieldCheck className="text-green-600" />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            name="crop"
            value={form.crop}
            onChange={handleChange}
            required
            placeholder="Crop Name"
            className="rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            placeholder="Quantity (e.g., 100 kg)"
            className="rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="farmer"
            value={form.farmer}
            onChange={handleChange}
            required
            placeholder="Farmer Name/ID"
            className="rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="Location"
            className="rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={submitting}
            className="md:col-span-4 inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 transition disabled:opacity-50"
          >
            <Camera size={18} />
            {submitting ? 'Generating...' : 'Generate Batch + Blockchain Hash'}
          </button>
        </form>

        {receipt && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2 rounded-lg border border-slate-200 p-4 bg-slate-50">
              <h3 className="font-semibold text-slate-700 mb-2">SMS-style Receipt</h3>
              <div className="text-sm text-slate-700 space-y-1">
                <p><span className="font-medium">Batch ID:</span> {receipt.batchId}</p>
                <p><span className="font-medium">Crop:</span> {receipt.crop} &middot; <span className="font-medium">Qty:</span> {receipt.quantity}</p>
                <p><span className="font-medium">Farmer:</span> {receipt.farmer} &middot; <span className="font-medium">Location:</span> {receipt.location}</p>
                <p className="break-all"><span className="font-medium">Hash:</span> {receipt.hash}</p>
                <p className="text-slate-500">Timestamp: {new Date(receipt.timestamp).toLocaleString()}</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-slate-200">
              <img src={receipt.imageUrl} alt="Crop" className="w-full h-40 object-cover" />
              <div className="p-3 text-xs text-slate-600">Proof-of-farm image</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
