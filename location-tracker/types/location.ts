export interface LocationPoint {
  id: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  speed?: number | null;
  heading?: number | null;
}

export interface TrackingSession {
  id: string;
  startTime: number;
  endTime?: number;
  locations: LocationPoint[];
  isActive: boolean;
}

export interface TrackingStats {
  totalDistance: number;
  duration: number;
  averageSpeed: number;
  maxSpeed: number;
  pointsCount: number;
}
