'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationPoint } from '@/types/location';

interface MapProps {
  locations: LocationPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function Map({ locations, center = [0, 0], zoom = 13 }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView(center, zoom);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || locations.length === 0) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    const latLngs: [number, number][] = locations.map(loc => [loc.latitude, loc.longitude]);

    const currentIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    const startIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background-color: #10b981; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    if (locations.length > 1) {
      const startMarker = L.marker([locations[0].latitude, locations[0].longitude], { icon: startIcon })
        .addTo(mapRef.current);
      markersRef.current.push(startMarker);
    }

    const currentLocation = locations[locations.length - 1];
    const currentMarker = L.marker([currentLocation.latitude, currentLocation.longitude], { icon: currentIcon })
      .addTo(mapRef.current);
    markersRef.current.push(currentMarker);

    if (latLngs.length > 1) {
      polylineRef.current = L.polyline(latLngs, {
        color: '#3b82f6',
        weight: 4,
        opacity: 0.7,
      }).addTo(mapRef.current);

      mapRef.current.fitBounds(polylineRef.current.getBounds(), { padding: [50, 50] });
    } else {
      mapRef.current.setView([currentLocation.latitude, currentLocation.longitude], zoom);
    }
  }, [locations, zoom]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full rounded-lg overflow-hidden shadow-lg"
      style={{ minHeight: '400px' }}
    />
  );
}
