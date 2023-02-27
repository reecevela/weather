import getWeather from "./weather";
import getForecast from "./forecast";
const {log} = console;

const root = document.getElementById('root');
log(root);


getWeather(41.4221,-91.0432).then(
    data => {
        getForecast(data.gridId, data.gridX, data.gridY).then(
            forecast => {
                log(forecast);
            }
        )
    }
)