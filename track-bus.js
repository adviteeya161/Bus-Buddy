javascript
// Dummy bus numbers — replace with dynamic data from your backend or API
const busNumbers = ['UP32 B1234', 'UP14 C8765', 'DL1Z E4321'];

const busList = document.getElementById('busList');
busNumbers.forEach(number => {
  const li = document.createElement('li');
  li.textContent = number;
  busList.appendChild(li);
});

// Initialize Leaflet map
const map = L.map('map').setView([28.6692, 77.4538], 13); // Centered on Ghaziabad by default

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Sample bus location — replace with real GPS data
const busMarker = L.marker([28.6692, 77.4538]).addTo(map);
busMarker.bindPopup("Bus UP32 B1234").openPopup();
