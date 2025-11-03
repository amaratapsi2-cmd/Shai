# Location Tracker

A modern, real-time location tracking application built with Next.js, TypeScript, and Leaflet maps.

## Features

- **Real-time Location Tracking**: Track your location using the browser's Geolocation API
- **Interactive Map**: Visualize your route on an interactive map with OpenStreetMap tiles
- **Detailed Statistics**: View distance traveled, duration, average speed, and max speed
- **Session History**: Save and review past tracking sessions
- **Data Export**: Export your tracks in JSON or GPX format
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Local Storage**: All data is stored locally in your browser

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Modern web browser with Geolocation API support

### Installation

1. Navigate to the project directory:
```bash
cd location-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Start Tracking**: Click the "Start Tracking" button to begin recording your location
2. **View Live Map**: Watch your route appear in real-time on the map
3. **Monitor Statistics**: Check distance, speed, and other metrics in the sidebar
4. **Stop Tracking**: Click "Stop Tracking" when finished
5. **Export Data**: Export your track as JSON or GPX for use in other applications
6. **View History**: Access past tracking sessions from the history section

## Technology Stack

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Leaflet**: Interactive maps
- **Geolocation API**: Browser-based location tracking

## Features in Detail

### Location Tracking
- High accuracy GPS tracking
- Automatic position updates
- Speed and heading information
- Error handling for permission issues

### Map Visualization
- OpenStreetMap tiles
- Route polyline display
- Start and current position markers
- Auto-zoom to fit route

### Statistics Calculation
- Haversine formula for accurate distance
- Real-time speed calculations
- Duration tracking
- Point count

### Data Export
- JSON format for data analysis
- GPX format for GPS applications
- Compatible with popular mapping tools

## Browser Permissions

The application requires location permissions to function. When prompted:
1. Click "Allow" to enable location tracking
2. Ensure location services are enabled on your device
3. For best accuracy, use HTTPS or localhost

## Privacy

All location data is stored locally in your browser's localStorage. No data is sent to external servers.

## License

MIT License - feel free to use this project for personal or commercial purposes.
