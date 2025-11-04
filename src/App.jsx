import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FarmerForm from './components/FarmerForm';
import DistributorDashboard from './components/DistributorDashboard';
import ConsumerPortal from './components/ConsumerPortal';

export default function App() {
  const [batches, setBatches] = useState([]);

  const handleRegister = (record) => {
    setBatches((prev) => [record, ...prev]);
  };

  const handleUpdate = (updated) => {
    setBatches((prev) => prev.map((b) => (b.batchId === updated.batchId ? updated : b)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white" id="home">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">KrishiTrace</h1>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Blockchain-based supply chain transparency for agricultural produce. Register batches, update ownership, and let consumers verify authenticity.
          </p>
        </div>

        <FarmerForm onRegister={handleRegister} />
        <DistributorDashboard batches={batches} onUpdate={handleUpdate} />
        <ConsumerPortal batches={batches} />

        <footer className="py-8 text-center text-sm text-slate-500">Built for hackathon demo – UI-only prototype</footer>
      </main>
    </div>
  );
}
