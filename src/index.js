import "./index.css";
import getWeather from "./weather";
import getForecast from "./forecast";
import WeatherDashboard from "./WeatherDashboard";

const { log } = console;

const root = document.getElementById("root");
log(root);

(async () => {
  const data = await getWeather(41.4221, -91.0432);
  const forecast = await getForecast(data.gridId, data.gridX, data.gridY);
  const weatherDashboard = new WeatherDashboard(root, forecast);
  weatherDashboard.render();
})();
