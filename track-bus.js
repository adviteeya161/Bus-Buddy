// Dummy bus route coordinates (or simulated ones for now)
const route = [
  [30.2711, 78.0533], // Graphic Era
  [30.2735, 78.0300], // Clement Town
  [30.2903, 78.0132], // ISBT
  [30.3180, 78.0330], // Paltan Bazaar
  [30.3256, 78.0421]  // Clock Tower
];

// Initialize the map
const map = L.map('map').setView([30.2711, 78.0533], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Optional: Store existing markers to remove/update them later
let markers = [];

// Fetch real-time or simulated bus data and update markers
async function updateBusLocation() {
  try {
    const response = await fetch('/api/bus-locations'); // Replace with actual API route
    const data = await response.json();

    // Remove previous markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Add new markers
    data.forEach(bus => {
      const marker = L.marker([bus.lat, bus.lng]).addTo(map);
      marker.bindPopup(`Bus ${bus.number}`);
      markers.push(marker);
    });
  } catch (error) {
    console.error("Error fetching bus data:", error);
  }
}

// Update map every 5 seconds
setInterval(updateBusLocation, 5000);

// Initial load
updateBusLocation();
