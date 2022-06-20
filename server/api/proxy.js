const axios = require("axios");

const IPINFO_URL = 'https://ipinfo.io';
const WEATHER_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact';
const USER_AGENT_HEADER = 'WeatherApp/1.0.0 github.com/LRN2111/weather-job-app';

function getData() {
    const ipPromise = getIPPromise();
    const weatherPromise = ipPromise
        .then(
            function(ipResult) { return getWeatherPromise(ipResult.data.loc); },
            handleError
        );
    return Promise.all([ipPromise, weatherPromise]).then(
        function([ipResult, weatherResult]) {
            const ipData = handleIPResolve(ipResult);
            const weatherData = handleWeatherResolve(weatherResult);
            return {...ipData, ...weatherData};
        },
        handleError
    );
}

function getIPPromise() {
    return axios.get(
        IPINFO_URL,
        { params: {token: process.env.IPINFO_TOKEN} }
    );
}

function getWeatherPromise(loc) {
    const [ lat, lon ] = parseLocation(loc);
    return axios.get(
        WEATHER_URL,
        {
          params: {lat: lat, lon: lon},
          headers: {
            'User-Agent': USER_AGENT_HEADER,
          },
        },
    );
}

function handleIPResolve(response) {
    [ lat, lon ] = parseLocation(response.data.loc);
    const { city, region, country } = response.data;
    return {lat: lat, lon: lon, city: city, region: region, country: country};
};

function handleWeatherResolve(response) {
    return {
        weather: response.data.properties,
        expires: response.headers['expires']
    };
};


function handleError(error) {
    console.log(error);
    console.log("ERROR");
}

function parseLocation(loc) {
    const [ latString, lonString ] = loc.split(',');
    const lat = parseFloat(latString).toFixed(4);
    const lon = parseFloat(lonString).toFixed(4);
    return [lat, lon];
}

module.exports = {
    getData
}