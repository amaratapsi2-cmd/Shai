'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LocationPoint, TrackingSession } from '@/types/location';
import { locationService } from '@/lib/locationService';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  const [isTracking, setIsTracking] = useState(false);
  const [locations, setLocations] = useState<LocationPoint[]>([]);
  const [sessions, setSessions] = useState<TrackingSession[]>([]);
  const [currentSession, setCurrentSession] = useState<TrackingSession | null>(null);
  const [error, setError] = useState<string>('');
  const [stats, setStats] = useState({
    totalDistance: 0,
    duration: 0,
    averageSpeed: 0,
    maxSpeed: 0,
    pointsCount: 0,
  });

  useEffect(() => {
    const savedSessions = localStorage.getItem('trackingSessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      const newStats = locationService.calculateStats(locations);
      setStats(newStats);
    }
  }, [locations]);

  const startTracking = () => {
    setError('');
    const session: TrackingSession = {
      id: `session-${Date.now()}`,
      startTime: Date.now(),
      locations: [],
      isActive: true,
    };
    setCurrentSession(session);
    setLocations([]);
    setIsTracking(true);

    locationService.startTracking(
      (location) => {
        setLocations((prev) => [...prev, location]);
        setCurrentSession((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            locations: [...prev.locations, location],
          };
        });
      },
      (errorMsg) => {
        setError(errorMsg);
        setIsTracking(false);
      }
    );
  };

  const stopTracking = () => {
    locationService.stopTracking();
    setIsTracking(false);

    if (currentSession && locations.length > 0) {
      const finalSession: TrackingSession = {
        ...currentSession,
        endTime: Date.now(),
        locations: locations,
        isActive: false,
      };

      const updatedSessions = [...sessions, finalSession];
      setSessions(updatedSessions);
      localStorage.setItem('trackingSessions', JSON.stringify(updatedSessions));
      setCurrentSession(null);
    }
  };

  const clearHistory = () => {
    setSessions([]);
    localStorage.removeItem('trackingSessions');
  };

  const loadSession = (session: TrackingSession) => {
    setLocations(session.locations);
    setCurrentSession(session);
  };

  const exportSession = (session: TrackingSession, format: 'json' | 'gpx') => {
    const data = format === 'json' 
      ? locationService.exportToJSON(session)
      : locationService.exportToGPX(session);
    
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `track-${new Date(session.startTime).toISOString()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${meters.toFixed(0)} m`;
    }
    return `${(meters / 1000).toFixed(2)} km`;
  };

  const formatSpeed = (metersPerSecond: number) => {
    const kmh = metersPerSecond * 3.6;
    return `${kmh.toFixed(1)} km/h`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Location Tracker</h1>
          <p className="text-slate-600">Track your location in real-time with detailed statistics</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-800">Live Map</h2>
                <div className="flex gap-3">
                  {!isTracking ? (
                    <button
                      onClick={startTracking}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Start Tracking
                    </button>
                  ) : (
                    <button
                      onClick={stopTracking}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Stop Tracking
                    </button>
                  )}
                </div>
              </div>

              {isTracking && (
                <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Tracking active</span>
                </div>
              )}

              <div className="h-[500px] rounded-lg overflow-hidden">
                {locations.length > 0 ? (
                  <Map locations={locations} />
                ) : (
                  <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center">
                    <p className="text-slate-500">Start tracking to see your location on the map</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Statistics</h2>
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <p className="text-sm text-slate-600 mb-1">Distance</p>
                  <p className="text-2xl font-bold text-slate-900">{formatDistance(stats.totalDistance)}</p>
                </div>
                <div className="border-b border-slate-200 pb-3">
                  <p className="text-sm text-slate-600 mb-1">Duration</p>
                  <p className="text-2xl font-bold text-slate-900">{formatDuration(stats.duration)}</p>
                </div>
                <div className="border-b border-slate-200 pb-3">
                  <p className="text-sm text-slate-600 mb-1">Average Speed</p>
                  <p className="text-2xl font-bold text-slate-900">{formatSpeed(stats.averageSpeed)}</p>
                </div>
                <div className="border-b border-slate-200 pb-3">
                  <p className="text-sm text-slate-600 mb-1">Max Speed</p>
                  <p className="text-2xl font-bold text-slate-900">{formatSpeed(stats.maxSpeed)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Points Recorded</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.pointsCount}</p>
                </div>
              </div>
            </div>

            {locations.length > 0 && currentSession && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Export Current Track</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => exportSession(currentSession, 'json')}
                    className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Export as JSON
                  </button>
                  <button
                    onClick={() => exportSession(currentSession, 'gpx')}
                    className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Export as GPX
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-slate-800">Tracking History</h2>
            {sessions.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear History
              </button>
            )}
          </div>

          {sessions.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No tracking sessions yet</p>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => {
                const sessionStats = locationService.calculateStats(session.locations);
                return (
                  <div
                    key={session.id}
                    className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {new Date(session.startTime).toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-600">
                          {formatDistance(sessionStats.totalDistance)} • {formatDuration(sessionStats.duration)} • {session.locations.length} points
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => loadSession(session)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => exportSession(session, 'json')}
                          className="px-3 py-1 text-sm bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
                        >
                          JSON
                        </button>
                        <button
                          onClick={() => exportSession(session, 'gpx')}
                          className="px-3 py-1 text-sm bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
                        >
                          GPX
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
