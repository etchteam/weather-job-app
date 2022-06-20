const axios = require("axios");
const { getCachedData, cacheData } = require("./cache.js");

const IPINFO_URL = 'https://ipinfo.io';
const WEATHER_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact';
const USER_AGENT_HEADER = 'WeatherApp/1.0.0 github.com/LRN2111/weather-job-app';

function getData() {
    let key;
    let weatherData;
    let cacheDataFound = false;
    const ipPromise = getIPPromise();
    const weatherPromise = ipPromise.then(
        (ipResult) => {
            key = ipResult.data.ip;
            weatherData = getCachedData(key);
            if (weatherData) {
                console.log(`Cached data found for ${key}. Expires at ${weatherData.expires}`);
                cacheDataFound = true;
                return new Promise((resolve, reject) => {resolve(weatherData)});
            } else {
                console.log(`No cached data found for ${key}. Fetching data...`);
                return getWeatherPromise(ipResult.data.loc);
            }
        }
    )
    return Promise.all([ipPromise, weatherPromise]).then(
        function([ipResult, weatherResult]) {
            const ipData = handleIPResolve(ipResult);
            const weatherData = handleWeatherResolve(weatherResult);
            const data = {...ipData, ...weatherData};
            if (!cacheDataFound) {
                const ttl = (new Date(weatherResult.headers["expires"]) - new Date()) / 1000;
                cacheData(key, weatherData, ttl);
            }
            return data;
        },
        handleError
    )
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
    const [ lat, lon ] = parseLocation(response.data.loc);
    const { city, region, country, ip } = response.data;
    return {lat: lat, lon: lon, city: city, region: region, country: country, ip: ip};
};

function handleWeatherResolve(response) {
    if (response.hasOwnProperty("headers")) {
        return {
            weather: response.data.properties,
            expires: response.headers['expires']
        };
    } else {
        return response;
    }
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