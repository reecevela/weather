export default async function getWeather(latitude, longitude) {
    const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}/forecast`, {mode: 'cors'});
    const weatherData = await response.json()
    return weatherData.properties;
}