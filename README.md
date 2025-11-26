# 🗺️ City Events

A modern, interactive web application that displays city events on an interactive map. Built with Node.js, Express, and Maplibre GL for real-time event discovery in Timișoara, Romania.

## Features

✨ **Interactive Map**
- Beautiful, colorful map powered by Maplibre GL and CartoDB Voyager
- Smooth map interactions and animations
- Real-time event markers with icons

📍 **Location Services**
- Get your current location with one click
- Geolocation permission request on first load
- Remember your location for quick returns

🎯 **Event Discovery**
- View all city events on the map
- Click on event markers to see details
- Popup shows: event name, street address, date, time, and duration

📱 **Mobile Optimized**
- Fully responsive design
- Touch-friendly interface
- Works great on phones and tablets

🎨 **Modern UI**
- Clean, minimalist design
- Smooth animations and transitions
- Professional styling with Font Awesome icons

## Project Structure

```
CityEvents/
├── server.js              # Express.js backend server
├── package.json           # Project dependencies
├── README.md             # This file
├── logs/                 # Server logs directory
└── public/
    ├── index.html        # Main HTML file
    ├── script.js         # Frontend JavaScript
    ├── style.css         # Styling
    ├── favicon.ico       # (optional) favicon
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or download the project
```bash
cd CityEvents
```

2. Install dependencies
```bash
npm install
```

### Running the Server

Start the development server:
```bash
node server.js
```

The server will start on `http://localhost:3000`

You should see:
```
✓ Server running on http://localhost:3000
✓ Events API: http://localhost:3000/api/events
✓ Health check: http://localhost:3000/health
✓ Logs saved to: logs/server-2025-11-26.log
```

### Environment Variables

You can customize the port using environment variables:

**Windows (PowerShell):**
```powershell
$env:PORT=5000; node server.js
```

**Linux/Mac:**
```bash
PORT=5000 node server.js
```

## API Endpoints

### Get All Events
```
GET /api/events
```

Returns JSON array of all events:
```json
[
  {
    "id": 1,
    "name": "Timișoara Jazz Festival",
    "latitude": 45.7489,
    "longitude": 21.2087,
    "street": "Piața Operei 2",
    "date": "2025-03-18",
    "time": "20:00",
    "duration": "3 hours"
  }
]
```

### Health Check
```
GET /health
```

Returns server status:
```json
{
  "status": "ok",
  "timestamp": "2025-11-26T14:59:07.016Z"
}
```

## Logs

Server logs are automatically saved to `logs/` directory with daily files:
- Format: `server-YYYY-MM-DD.log`
- Contains timestamps, request info, and errors
- Automatically created on first run

## Features Guide

### 📍 Location Button
- Click the location icon (bottom-right)
- Browser requests location permission
- Map zooms to your location
- Your position is marked with a gradient circle

### 🎯 Event Markers
- Calendar icons on the map
- Click to view event details
- Shows in popup: name, address, date, time, duration

### 🗺️ Map Controls
- Zoom: Scroll wheel or pinch on mobile
- Pan: Click and drag
- Double-click to zoom in
- Attribution: Map credits (bottom-left)

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Mapping:** Maplibre GL, CartoDB Voyager
- **Icons:** Font Awesome 6
- **Logging:** Node.js fs module

## Customization

### Add More Events

Edit `server.js` and add to the `events` array:

```javascript
const events = [
  {
    id: 5,
    name: "Your Event Name",
    latitude: 45.7500,
    longitude: 21.2300,
    street: "Street Name & Number",
    date: "2025-03-20",
    time: "18:00",
    duration: "2 hours"
  }
];
```

### Change Default Location

In `script.js`, modify the map center:

```javascript
const map = new maplibregl.Map({
  center: [21.2251, 45.7459], // [longitude, latitude]
  zoom: 13
});
```

### Change Map Style

Replace the style URL in `script.js`:
- Voyager (colorful): `https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json`
- Positron (minimal): `https://basemaps.cartocdn.com/gl/positron-gl-style/style.json`

## Performance

- Lightweight (~50KB assets)
- No database required (demo uses dummy data)
- Fast map rendering with Maplibre GL
- Optimized for mobile devices

## Future Enhancements

- [ ] Real-time traffic integration (TomTom API)
- [ ] Event filtering by date/category
- [ ] User reviews and ratings
- [ ] Event creation form
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Push notifications
- [ ] Event search
- [ ] Multiple city support

## Troubleshooting

### Map not loading?
- Check browser console (F12) for errors
- Verify internet connection
- Clear browser cache

### Geolocation not working?
- HTTPS or localhost only (browser security)
- Check browser location permissions
- Allow location access when prompted

### Logs not appearing?
- Check `logs/` directory
- Logs are created automatically on first run
- Each day gets a separate log file

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Check server logs in `logs/` directory

---

**Built with ❤️ for City Events**
