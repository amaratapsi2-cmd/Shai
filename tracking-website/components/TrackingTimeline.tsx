'use client';

import { TrackingEvent } from '@/types/tracking';

interface TrackingTimelineProps {
  events: TrackingEvent[];
}

export default function TrackingTimeline({ events }: TrackingTimelineProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {events.map((event, index) => (
        <div key={event.id} className="relative flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                index === 0
                  ? 'bg-blue-600 border-blue-600'
                  : 'bg-white border-gray-300'
              }`}
            />
            {index < events.length - 1 && (
              <div className="w-0.5 h-full bg-gray-200 mt-2" />
            )}
          </div>
          
          <div className="flex-1 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{event.status}</h3>
              <span className="text-sm text-gray-500">{formatDate(event.timestamp)}</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{event.location}</p>
            <p className="text-sm text-gray-500">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
