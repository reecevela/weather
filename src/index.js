import "./index.css";
import getWeather from "./weather";
import getForecast from "./forecast";
import "../weather-icons-master/css/weather-icons.min.css";

const root = document.getElementById("root");

function getWeatherRowBackground(shortForecast, isDaytime) {
  let baseColor = "#e0e5ec";
  let weatherColor;
  if (/(Sunny|Clear)/.test(shortForecast)) {
    weatherColor = "#fff6a3";
  } else if (/Cloudy/.test(shortForecast)) {
    weatherColor = "#b0b0b0";
  } else if (/(Rain|Showers)/.test(shortForecast)) {
    weatherColor = "#2196F3";
  } else if (/Thunderstorms/.test(shortForecast)) {
    weatherColor = "#673AB7";
  } else if (/Snow/.test(shortForecast)) {
    weatherColor = "#B2EBF2";
  } else {
    weatherColor = "#e0e5ec";
  }

  let gradientColor = isDaytime ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
  return `linear-gradient(90deg, ${gradientColor} 0%, ${baseColor} 50%, ${weatherColor} 100%)`;
}

function createWeatherDashboard(forecast, location) {
  const dashboard = document.createElement("div");
  dashboard.classList.add("weather-dashboard");

  const todayCard = document.createElement("div");
  todayCard.classList.add("weather-card");
  todayCard.innerHTML = `
    <div class="location">${location}</div>
    <div class="date-time">${new Date().toLocaleString()}</div>
  `;
  dashboard.appendChild(todayCard);

  forecast.periods.slice(1).forEach((period) => {
    const weatherRow = document.createElement("div");
    weatherRow.classList.add("weather-row");
    weatherRow.style.background = getWeatherRowBackground(period.shortForecast, period.isDaytime);
    weatherRow.innerHTML = `
      <div>${period.name}</div>
      <div>${period.temperature}°${period.temperatureUnit}</div>
      <div>${period.shortForecast}</div>
    `;
    dashboard.appendChild(weatherRow);
  });

  root.appendChild(dashboard);
}

getWeather(41.4221, -91.0432).then((data) => {
  getForecast(data.gridId, data.gridX, data.gridY).then((forecast) => {
    createWeatherDashboard(forecast, `${data.relativeLocation.properties.city}, ${data.relativeLocation.properties.state}`);
    const timeElement = document.querySelector('.date-time');
    setInterval(() => {
      timeElement.innerHTML = `<div class="date-time">${new Date().toLocaleString()}</div>`
    }, 1000);
  });
});
