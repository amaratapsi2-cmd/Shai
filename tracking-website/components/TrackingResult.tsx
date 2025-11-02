'use client';

import { TrackingInfo } from '@/types/tracking';
import TrackingTimeline from './TrackingTimeline';

interface TrackingResultProps {
  trackingInfo: TrackingInfo;
  onNewSearch: () => void;
}

export default function TrackingResult({ trackingInfo, onNewSearch }: TrackingResultProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'exception':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'in_transit':
        return 'In Transit';
      case 'pending':
        return 'Pending';
      case 'exception':
        return 'Exception';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tracking Details</h2>
          <button
            onClick={onNewSearch}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            New Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
            <p className="font-semibold text-gray-900">{trackingInfo.trackingNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Carrier</p>
            <p className="font-semibold text-gray-900">{trackingInfo.carrier}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(trackingInfo.status)}`}>
              {getStatusText(trackingInfo.status)}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
            <p className="font-semibold text-gray-900">{formatDate(trackingInfo.estimatedDelivery)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div>
            <p className="text-xs text-gray-500 mb-1">Origin</p>
            <p className="text-sm font-medium text-gray-900">{trackingInfo.origin}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Current Location</p>
            <p className="text-sm font-medium text-gray-900">{trackingInfo.currentLocation}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Destination</p>
            <p className="text-sm font-medium text-gray-900">{trackingInfo.destination}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Shipment History</h3>
        <TrackingTimeline events={trackingInfo.events} />
      </div>
    </div>
  );
}
