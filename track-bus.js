// Dummy bus route coordinates (or simulated ones for now)
// Dummy bus location data
const simulatedData = [
  { number: "UK07 AB 1234", lat: 30.2711, lng: 78.0533 },
  { number: "UK07 XY 5678", lat: 30.2903, lng: 78.0132 },
  { number: "UK07 MN 9101", lat: 30.3256, lng: 78.0421 }
];

// Initialize the map
const map = L.map('map').setView([30.2711, 78.0533], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let markers = [];

// Simulated API response handler
async function updateBusLocation() {
  try {
    // Simulate fetching data with a slight delay
    const data = await new Promise((resolve) => {
      setTimeout(() => resolve(simulatedData), 1000);
    });

    // Clear old markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Add new markers
    data.forEach(bus => {
      const marker = L.marker([bus.lat, bus.lng]).addTo(map);
      marker.bindPopup(`Bus ${bus.number}`);
      markers.push(marker);
    });
  } catch (error) {
    console.error("Simulated fetch failed:", error);
  }
}

setInterval(updateBusLocation, 5000);
updateBusLocation();
