import "./index.css";
import getWeather from "./weather";
import getForecast from "./forecast";
import "../weather-icons-master/css/weather-icons.min.css";
import { cities } from "./cities";

const root = document.getElementById("root");

updateForecast(41.4221, -91.0432);

//all functions below
const handleCitySubmit = (e) => {
  e.preventDefault();
  const cityStateString = document.getElementById('city-choice').value;
  const [cityInput, stateInput] = cityStateString.split(", ");
  // Find the city with that name
  const cityMatch = cities.find((city) => city.city == cityInput && city.state == stateInput);
  updateForecast(cityMatch.latitude, cityMatch.longitude, cityStateString);
}

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
    <br>
    <form id="city-form">
      <label for="city">Choose from over 1000 cities:</label>
      <input list="cities" id="city-choice" name="city-choice">
      <input type="submit" id="city-submit">
      <datalist id="cities">
        ${cities.map( (place) => {
          return `<option value="${place.city}, ${place.state}">`
        }).join('')}
      </datalist>
    </form>
  `;
  dashboard.appendChild(todayCard);
  
  
  forecast.periods.slice(1).forEach((period) => {
    const weatherRow = document.createElement("div");
    weatherRow.classList.add("weather-row");
    weatherRow.style.boxShadow = getWeatherRowBoxShadow(period.shortForecast, period.isDaytime);
    weatherRow.innerHTML = `
    <div>
    <div style="font-weight:bold">${period.name}</div>
    <div>${period.temperature}°${period.temperatureUnit}</div>
    ${getWeatherIconHTML(period.shortForecast, period.isDaytime)}
    </div>
    <div>
    <div>${period.detailedForecast}</div>
    </div>
    `;
    dashboard.appendChild(weatherRow);
  });

  //clear existing children
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  
  root.appendChild(dashboard);
  const cityForm = document.getElementById('city-form');
  cityForm.onsubmit = (e) => handleCitySubmit(e);
}

function updateForecast(lat, long, locationInput = null) {
  getWeather(lat, long).then((data) => {
    getForecast(data.gridId, data.gridX, data.gridY).then((forecast) => {
      if (!locationInput) {
        createWeatherDashboard(forecast, `${data.relativeLocation.properties.city}, ${data.relativeLocation.properties.state}`);
      } else {
        console.log(locationInput);
        createWeatherDashboard(forecast, locationInput);
      }
      const timeElement = document.querySelector('.date-time');
      setInterval(() => {
        timeElement.innerHTML = `<div class="date-time">${new Date().toLocaleString()}</div>`
      }, 1000);
    });
  });
}
