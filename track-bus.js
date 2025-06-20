const busRoutes = [
  {
    number: "UK07 AB 1234",
    path: [
      [30.2711, 78.0533],
      [30.2720, 78.0450],
      [30.2735, 78.0300],
      [30.2750, 78.0250],
      [30.2903, 78.0132]
    ],
    index: 0
  },
  {
    number: "UK07 XY 5678",
    path: [
      [30.3256, 78.0421],
      [30.3200, 78.0380],
      [30.3150, 78.0350],
      [30.3100, 78.0300],
      [30.3050, 78.0250]
    ],
    index: 0
  }
];

const map = L.map("map").setView([30.2711, 78.0533], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const markers = {};
const busList = document.getElementById("busList");

busRoutes.forEach((bus) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.textContent = bus.number;
  a.href = `bus-details.html?bus=${encodeURIComponent(bus.number)}`;
  a.style.textDecoration = "none";
  a.style.color = "#333";
  li.appendChild(a);
  busList.appendChild(li);

  const [lat, lng] = bus.path[0];
  markers[bus.number] = L.marker([lat, lng]).addTo(map).bindPopup(`Bus ${bus.number}`);
});

function moveBuses() {
  busRoutes.forEach((bus) => {
    bus.index = (bus.index + 1) % bus.path.length;
    const [lat, lng] = bus.path[bus.index];
    markers[bus.number].setLatLng([lat, lng]);
  });
}

setInterval(moveBuses, 3000);
