const stations = [
  "Graphic Era University",
  "Clement Town",
  "ISBT Dehradun",
  "Paltan Bazaar",
  "Clock Tower"
];

const list = document.getElementById("stationsList");
stations.forEach(station => {
  const li = document.createElement("li");
  li.textContent = station;
  list.appendChild(li);
});
