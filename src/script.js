const form = document.getElementById("ip-form");
const input = document.getElementById("ip-input");
const ipDisplay = document.getElementById("ip-display");
const locationDisplay = document.getElementById("location-display");
const timezoneDisplay = document.getElementById("timezone-display");
const ispDisplay = document.getElementById("isp-display");

const apiKey = "api-key";

async function fetchIPData(query = "") {
    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;

  if (query) {
    if (/^\d+\.\d+\.\d+\.\d+$/.test(query)) {
      url += `&ipAddress=${query}`;
    } else {
      url += `&domain=${query}`;
    }
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    console.log(data); // temporary: see the raw data
    return data;
  } catch (error) {
    console.error(error);
    alert("Invalid IP address or domain. Please try again.");
  }
}
