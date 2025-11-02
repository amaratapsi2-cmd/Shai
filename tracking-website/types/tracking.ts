export interface TrackingEvent {
  id: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

export interface TrackingInfo {
  trackingNumber: string;
  carrier: string;
  status: 'in_transit' | 'delivered' | 'pending' | 'exception';
  currentLocation: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  events: TrackingEvent[];
}
