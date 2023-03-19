import WeatherCard from "./WeatherCard";

export default class WeatherDashboard {
  constructor(root, forecast) {
    this.root = root;
    this.forecast = forecast.periods;
  }

  render() {
    const dashboard = document.createElement("div");
    dashboard.className = "weather-dashboard";

    this.forecast.forEach((period) => {
      const weatherCard = new WeatherCard(period);
      dashboard.appendChild(weatherCard.render());
    });

    this.root.appendChild(dashboard);
  }
}
