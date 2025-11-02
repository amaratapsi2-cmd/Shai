'use client';

import { useState } from 'react';
import TrackingSearch from '@/components/TrackingSearch';
import TrackingResult from '@/components/TrackingResult';
import { sampleTrackingData } from '@/data/sampleTracking';
import { TrackingInfo } from '@/types/tracking';

export default function Home() {
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = (trackingNumber: string) => {
    setError('');
    const info = sampleTrackingData[trackingNumber];
    
    if (info) {
      setTrackingInfo(info);
    } else {
      setError('Tracking number not found. Please try one of the sample tracking numbers.');
      setTrackingInfo(null);
    }
  };

  const handleNewSearch = () => {
    setTrackingInfo(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Package Tracking</h1>
          <p className="text-gray-600 mt-1">Track your shipments in real-time</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!trackingInfo ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Where is your package?
              </h2>
              <p className="text-gray-600">
                Enter your tracking number below to get real-time updates
              </p>
            </div>
            
            <TrackingSearch onSearch={handleSearch} />
            
            {error && (
              <div className="max-w-2xl mx-auto mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
                <p className="text-sm text-gray-600">
                  Get instant updates on your package location and delivery status
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Multiple Carriers</h3>
                <p className="text-sm text-gray-600">
                  Track packages from various shipping carriers in one place
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Detailed History</h3>
                <p className="text-sm text-gray-600">
                  View complete shipment history with timestamps and locations
                </p>
              </div>
            </div>
          </div>
        ) : (
          <TrackingResult trackingInfo={trackingInfo} onNewSearch={handleNewSearch} />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2025 Package Tracking. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
