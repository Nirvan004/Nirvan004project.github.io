const form = document.getElementById("ip-form");
const input = document.getElementById("ip-input");
const ipDisplay = document.getElementById("ip-display");
const locationDisplay = document.getElementById("location-display");
const timezoneDisplay = document.getElementById("timezone-display");
const ispDisplay = document.getElementById("isp-display");

let map = L.map("map").setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
}).addTo(map);

const customIcon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconSize: [46, 56],
  iconAnchor: [23, 56],
  popupAnchor: [0, -56]
});

let marker = L.marker([0, 0], { icon: customIcon }).addTo(map);

const apiKey = "at_yWn4bo0XrWupGb2mAAErQf9mDr6t7";

async function fetchIPData(query = "") {
    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;

  if (query) {
  const parts = query.split(".");
  if (parts.length === 4 && parts.every(part => Number(part) >= 0)) {
    url += `&ipAddress=${query}`;
  } else {
    url += `&domain=${query}`;
  }
}

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert("Invalid IP address or domain. Please try again.");
  }
}

function updateUI(data) {
  if (!data) return;

  ipDisplay.textContent = data.ip;
  locationDisplay.textContent = `${data.location.city}, ${data.location.region}`;
  timezoneDisplay.textContent = `UTC ${data.location.timezone}`;
  ispDisplay.textContent = data.isp;

  const lat = data.location.lat;
  const lng = data.location.lng;

  map.setView([lat, lng], 13);
  marker.setLatLng([lat, lng]);
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) {
    alert("Please enter an IP address or domain.");
    return;
  }
  const data = await fetchIPData(query);
  updateUI(data);
  input.value = "";
});

window.addEventListener("load", async function () {
  const data = await fetchIPData();
  updateUI(data);
});