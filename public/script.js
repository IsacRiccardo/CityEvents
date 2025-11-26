// Initialize Maplibre GL map
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
  center: [21.2251, 45.7459], // Timișoara
  zoom: 13
});

// Store user location for the button
let userLocation = null;

// Wait for map to load before doing anything
map.on('load', () => {
  console.log('Map loaded');
  
  // Location button handler
  const locateBtn = document.getElementById('locate-btn');
  locateBtn.addEventListener('click', () => {
    if (userLocation) {
      // We already have permission, just go back to stored location
      map.flyTo({
        center: [userLocation.lon, userLocation.lat],
        zoom: 14,
        duration: 1000
      });
    } else {
      alert("Location not available. Please enable location access.");
    }
  });

  // Request location on page load
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // Success
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        // Store location for button reuse
        userLocation = { lat, lon };

        // Move map to user with animation
        map.flyTo({
          center: [lon, lat],
          zoom: 14,
          duration: 1000
        });

        // Add marker for user location
        const userMarkerEl = document.createElement('div');
        userMarkerEl.className = 'user-marker';
        new maplibregl.Marker(userMarkerEl)
          .setLngLat([lon, lat])
          .addTo(map);
      },
      // Error
      (error) => {
        console.warn("Geolocation failed:", error.message);
        // Map stays on Timișoara
      },
      // Options
      {
        enableHighAccuracy: true,
        timeout: 5000
      }
    );
  } else {
    alert("Geolocation not supported.");
  }

  // Fetch and display events
  async function loadEvents() {
    const loadingEl = document.getElementById("loading");
    const errorEl = document.getElementById("error");
    
    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const events = await response.json();
      
      // Add event markers to map
      events.forEach((event) => {
        const markerEl = document.createElement('div');
        markerEl.className = 'event-marker';
        markerEl.innerHTML = '<i class="fas fa-calendar-days"></i>';
        
        const popup = new maplibregl.Popup({ offset: 25 })
          .setHTML(`
            <div class="event-popup">
              <strong>${event.name}</strong>
              <div class="event-street">📍 ${event.street}</div>
              <div>📅 <strong>${event.date}</strong></div>
              <div>🕐 <strong>${event.time}</strong></div>
              <div>⏱️ <strong>${event.duration}</strong></div>
            </div>
          `);
        
        new maplibregl.Marker(markerEl)
          .setLngLat([event.longitude, event.latitude])
          .setPopup(popup)
          .addTo(map);
      });
      
      console.log(`✓ Loaded ${events.length} events`);
      loadingEl.style.display = "none";
    } catch (error) {
      console.error("Failed to load events:", error);
      errorEl.textContent = `Error loading events: ${error.message}`;
      errorEl.style.display = "block";
      loadingEl.style.display = "none";
    }
  }

  // Load events
  loadEvents();
});
