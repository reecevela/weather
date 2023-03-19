import "./index.css";
import getWeather from "./weather";
import getForecast from "./forecast";
import "../weather-icons-master/css/weather-icons.min.css";

const root = document.getElementById("root");

function getWeatherRowBoxShadow(shortForecast, isDaytime) {
  let baseColor = "#e0e5ec";
  let weatherColor;
  if (/(Sunny)/.test(shortForecast)) {
    weatherColor = "#fff6a3";
  } else if (/Cloudy/.test(shortForecast)) {
    weatherColor = "#b0b0b0";
  } else if (/(Rain|Showers)/.test(shortForecast)) {
    weatherColor = "#2196F3";
  } else if (/storm/.test(shortForecast)) {
    weatherColor = "#673AB7";
  } else if (/Snow/.test(shortForecast)) {
    weatherColor = "#B2EBF2";
  } else {
    weatherColor = baseColor;
  }

  let dayColor = isDaytime ? "rgb(255, 255, 255)" : "rgba(0, 0, 0)";
  return `-2px 0px 2px ${dayColor},	4px 0px 2px ${weatherColor}`;
}

function getWeatherIconHTML(shortForecast, isDaytime) {
  let iconClass;
  if (/Sunny/.test(shortForecast)) {
    iconClass = 'sunny';
  } else if (/Clear/.test(shortForecast)) {
    iconClass = 'clear';
  } else if (/Cloudy/.test(shortForecast)) {
    iconClass = 'cloudy';
  } else if (/(Rain|Showers)/.test(shortForecast)) {
    iconClass = 'rain';
  } else if (/storm/.test(shortForecast)) {
    iconClass = 'thunderstorm';
  } else if (/Snow/.test(shortForecast)) {
    iconClass = 'snow';
  } else if (/Wind/.test(shortForecast)) {
    iconClass = 'windy';
  } else {
    console.error('no iconclass defined')
  }
  return `<i class="wi wi-${isDaytime ? 'day' : 'night'}-${iconClass}"></i>`;
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
    weatherRow.style.boxShadow = getWeatherRowBoxShadow(period.shortForecast, period.isDaytime);
    weatherRow.innerHTML = `
      <div>
        <div>${period.name}</div>
        <div>${period.temperature}°${period.temperatureUnit}</div>
      </div>
      <div>
        ${getWeatherIconHTML(period.shortForecast, period.isDaytime)}
        <div>${period.shortForecast}</div>
      </div>
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
