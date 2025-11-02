# Package Tracking Website

A modern, responsive package tracking website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📦 **Real-Time Tracking**: Track packages with detailed status updates
- 🚚 **Multiple Carriers**: Support for various shipping carriers
- 📍 **Detailed History**: Complete shipment timeline with locations and timestamps
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, beautiful interface with smooth transitions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd tracking-website
```

2. Install dependencies (already done):
```bash
npm install
```

### Running the Application

#### Development Mode
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Build
```bash
npm run build
npm start
```

## Usage

### Sample Tracking Numbers

Try these tracking numbers to see the system in action:

- **TRK123456789** - Package in transit from New York to San Francisco
- **TRK987654321** - Delivered package from Seattle to Boston
- **TRK555444333** - Pending package from Miami to Denver

### How to Track

1. Enter a tracking number in the search field
2. Click "Track Package" or press Enter
3. View detailed tracking information including:
   - Current status and location
   - Origin and destination
   - Estimated delivery date
   - Complete shipment history with timeline

## Project Structure

```
tracking-website/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main tracking page
│   └── globals.css         # Global styles
├── components/
│   ├── TrackingSearch.tsx  # Search input component
│   ├── TrackingResult.tsx  # Results display component
│   └── TrackingTimeline.tsx # Timeline visualization
├── data/
│   └── sampleTracking.ts   # Sample tracking data
├── types/
│   └── tracking.ts         # TypeScript type definitions
└── public/                 # Static assets
```

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Geist Sans & Geist Mono

## Customization

### Adding New Tracking Data

Edit `data/sampleTracking.ts` to add more tracking numbers:

```typescript
export const sampleTrackingData: Record<string, TrackingInfo> = {
  'YOUR_TRACKING_NUMBER': {
    trackingNumber: 'YOUR_TRACKING_NUMBER',
    carrier: 'Carrier Name',
    status: 'in_transit',
    // ... more fields
  }
};
```

### Styling

The application uses Tailwind CSS. Modify component classes or update `tailwind.config.ts` for theme customization.

## Build Information

- Build completed successfully ✓
- TypeScript compilation passed ✓
- Static pages generated ✓
- Production-ready ✓

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please refer to the Next.js documentation at [nextjs.org](https://nextjs.org).
