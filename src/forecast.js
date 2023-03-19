export default async function getForecast(id, x, y) {
    const response = await fetch(
      `https://api.weather.gov/gridpoints/${id}/${x},${y}/forecast`,
      { mode: "cors" }
    );
    const forecast = await response.json();
    return forecast.properties;
  }
  