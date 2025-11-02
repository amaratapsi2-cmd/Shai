'use client';

import { useState } from 'react';

interface TrackingSearchProps {
  onSearch: (trackingNumber: string) => void;
}

export default function TrackingSearch({ onSearch }: TrackingSearchProps) {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      onSearch(trackingNumber.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Tracking Number
          </label>
          <input
            type="text"
            id="tracking"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="e.g., TRK123456789"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Track Package
        </button>
      </form>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 font-medium mb-2">Try these sample tracking numbers:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTrackingNumber('TRK123456789')}
            className="text-xs bg-white px-3 py-1.5 rounded border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            TRK123456789
          </button>
          <button
            onClick={() => setTrackingNumber('TRK987654321')}
            className="text-xs bg-white px-3 py-1.5 rounded border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            TRK987654321
          </button>
          <button
            onClick={() => setTrackingNumber('TRK555444333')}
            className="text-xs bg-white px-3 py-1.5 rounded border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            TRK555444333
          </button>
        </div>
      </div>
    </div>
  );
}
