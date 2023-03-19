export default class WeatherCard {
    constructor(forecast) {
      this.forecast = forecast;
    }
  
    render() {
      const card = document.createElement("div");
      card.className = "weather-card";
      card.tabIndex = 0;
  
      const date = document.createElement("h3");
      date.textContent = this.forecast.name;
      card.appendChild(date);
  
      const icon = document.createElement("img");
      icon.src = this.forecast.icon;
      icon.alt = this.forecast.shortForecast;
      card.appendChild(icon);
  
      const temperature = document.createElement("p");
      temperature.textContent = `${this.forecast.temperature}° ${this.forecast.temperatureUnit}`;
      card.appendChild(temperature);
  
      const description = document.createElement("p");
      description.textContent = this.forecast.shortForecast;
      card.appendChild(description);
  
      return card;
    }
  }
  