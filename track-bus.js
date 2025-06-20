const busSchedule = [
  {
    number: "UK07 AB 1234",
    departure: "10:00", // from Graphic Era
    stops: [
      { name: "Graphic Era University", time: "10:00", coords: [30.2711, 78.0533] },
      { name: "Clement Town", time: "10:05", coords: [30.2735, 78.0300] },
      { name: "ISBT", time: "10:15", coords: [30.2903, 78.0132] }
    ]
  },
  {
    number: "UK07 XY 5678",
    departure: "10:10",
    stops: [
      { name: "Clock Tower", time: "10:10", coords: [30.3256, 78.0421] },
      { name: "Paltan Bazaar", time: "10:15", coords: [30.3200, 78.0380] },
      { name: "ISBT", time: "10:20", coords: [30.2903, 78.0132] }
    ]
  }
];

// Utility to parse time in HH:mm to minutes since midnight
function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getCurrentTimeMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

// Init map
const map = L.map("map").setView([30.2903, 78.0332], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const busList = document.getElementById("busList");

busSchedule.forEach(bus => {
  const li = document.createElement("li");

  const currentTime = getCurrentTimeMinutes();
  const upcomingStop = bus.stops.find((stop, i) => {
    const next = bus.stops[i + 1];
    if (!next) return false;
    const current = timeToMinutes(stop.time);
    const nextTime = timeToMinutes(next.time);
    return currentTime >= current && currentTime < nextTime;
  });

  const status = upcomingStop
    ? `🟢 Currently Approaching: ${upcomingStop.name}`
    : currentTime < timeToMinutes(bus.stops[0].time)
    ? `🟡 Scheduled to depart at ${bus.departure}`
    : `🔴 Completed route`;

  const a = document.createElement("a");
  a.href = `bus-details.html?bus=${encodeURIComponent(bus.number)}`;
  a.textContent = `${bus.number} – ${status}`;
  a.style.textDecoration = "none";
  a.style.color = "#333";

  li.appendChild(a);
  busList.appendChild(li);

  // Place marker at most recent passed stop
  let activeStop = bus.stops[0].coords;
  for (let i = 0; i < bus.stops.length; i++) {
    if (currentTime >= timeToMinutes(bus.stops[i].time)) {
      activeStop = bus.stops[i].coords;
    }
  }

  const marker = L.marker(activeStop).addTo(map);
  marker.bindPopup(`Bus ${bus.number}<br>${status}`);
});


