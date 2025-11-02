import { TrackingInfo } from '@/types/tracking';

export const sampleTrackingData: Record<string, TrackingInfo> = {
  'TRK123456789': {
    trackingNumber: 'TRK123456789',
    carrier: 'Express Shipping',
    status: 'in_transit',
    currentLocation: 'Distribution Center - Los Angeles, CA',
    origin: 'New York, NY',
    destination: 'San Francisco, CA',
    estimatedDelivery: '2025-11-05',
    events: [
      {
        id: '1',
        status: 'In Transit',
        location: 'Los Angeles, CA',
        timestamp: '2025-11-02T14:30:00Z',
        description: 'Package arrived at distribution center'
      },
      {
        id: '2',
        status: 'In Transit',
        location: 'Phoenix, AZ',
        timestamp: '2025-11-02T08:15:00Z',
        description: 'Package departed facility'
      },
      {
        id: '3',
        status: 'In Transit',
        location: 'Dallas, TX',
        timestamp: '2025-11-01T18:45:00Z',
        description: 'Package in transit'
      },
      {
        id: '4',
        status: 'Picked Up',
        location: 'New York, NY',
        timestamp: '2025-11-01T10:00:00Z',
        description: 'Package picked up from sender'
      }
    ]
  },
  'TRK987654321': {
    trackingNumber: 'TRK987654321',
    carrier: 'Global Logistics',
    status: 'delivered',
    currentLocation: 'Delivered',
    origin: 'Seattle, WA',
    destination: 'Boston, MA',
    estimatedDelivery: '2025-11-01',
    events: [
      {
        id: '1',
        status: 'Delivered',
        location: 'Boston, MA',
        timestamp: '2025-11-01T16:20:00Z',
        description: 'Package delivered successfully'
      },
      {
        id: '2',
        status: 'Out for Delivery',
        location: 'Boston, MA',
        timestamp: '2025-11-01T09:00:00Z',
        description: 'Out for delivery'
      },
      {
        id: '3',
        status: 'In Transit',
        location: 'Chicago, IL',
        timestamp: '2025-10-31T14:30:00Z',
        description: 'Package in transit'
      },
      {
        id: '4',
        status: 'Picked Up',
        location: 'Seattle, WA',
        timestamp: '2025-10-30T11:00:00Z',
        description: 'Package picked up from sender'
      }
    ]
  },
  'TRK555444333': {
    trackingNumber: 'TRK555444333',
    carrier: 'Fast Delivery Co.',
    status: 'pending',
    currentLocation: 'Processing Center',
    origin: 'Miami, FL',
    destination: 'Denver, CO',
    estimatedDelivery: '2025-11-06',
    events: [
      {
        id: '1',
        status: 'Label Created',
        location: 'Miami, FL',
        timestamp: '2025-11-02T09:00:00Z',
        description: 'Shipping label created, awaiting pickup'
      }
    ]
  }
};
