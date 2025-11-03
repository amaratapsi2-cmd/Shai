import { LocationPoint, TrackingSession, TrackingStats } from '@/types/location';

export class LocationService {
  private watchId: number | null = null;
  private currentSession: TrackingSession | null = null;

  startTracking(onLocationUpdate: (location: LocationPoint) => void, onError: (error: string) => void): void {
    if (!navigator.geolocation) {
      onError('Geolocation is not supported by your browser');
      return;
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location: LocationPoint = {
          id: `${Date.now()}-${Math.random()}`,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
          speed: position.coords.speed,
          heading: position.coords.heading,
        };
        onLocationUpdate(location);
      },
      (error) => {
        onError(this.getErrorMessage(error));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  stopTracking(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  private getErrorMessage(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Location permission denied. Please enable location access.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information is unavailable.';
      case error.TIMEOUT:
        return 'Location request timed out.';
      default:
        return 'An unknown error occurred.';
    }
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  calculateStats(locations: LocationPoint[]): TrackingStats {
    if (locations.length === 0) {
      return {
        totalDistance: 0,
        duration: 0,
        averageSpeed: 0,
        maxSpeed: 0,
        pointsCount: 0,
      };
    }

    let totalDistance = 0;
    let maxSpeed = 0;

    for (let i = 1; i < locations.length; i++) {
      const prev = locations[i - 1];
      const curr = locations[i];
      
      totalDistance += this.calculateDistance(
        prev.latitude,
        prev.longitude,
        curr.latitude,
        curr.longitude
      );

      if (curr.speed && curr.speed > maxSpeed) {
        maxSpeed = curr.speed;
      }
    }

    const duration = locations.length > 0 
      ? (locations[locations.length - 1].timestamp - locations[0].timestamp) / 1000 
      : 0;
    
    const averageSpeed = duration > 0 ? totalDistance / duration : 0;

    return {
      totalDistance,
      duration,
      averageSpeed,
      maxSpeed,
      pointsCount: locations.length,
    };
  }

  exportToJSON(session: TrackingSession): string {
    return JSON.stringify(session, null, 2);
  }

  exportToGPX(session: TrackingSession): string {
    const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Location Tracker">
  <trk>
    <name>Track ${new Date(session.startTime).toISOString()}</name>
    <trkseg>
${session.locations.map(loc => `      <trkpt lat="${loc.latitude}" lon="${loc.longitude}">
        <time>${new Date(loc.timestamp).toISOString()}</time>
      </trkpt>`).join('\n')}
    </trkseg>
  </trk>
</gpx>`;
    return gpx;
  }
}

export const locationService = new LocationService();
