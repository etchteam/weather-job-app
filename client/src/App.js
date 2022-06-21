import React, { useEffect, useState } from "react";
import WeatherContainer from './WeatherContainer';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [locationData, setLocationData] = useState({});
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setLocationData({
          lat: result.lat,
          lon: result.lon,
          city: result.city,
          region: result.region,
          country: result.country,
        })
        setWeatherData(result.weather);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  if (error) {
    console.log(error);
    return <div>Error</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='container-fluid'>
        <WeatherContainer
          locationData={locationData}
          weatherData={weatherData}
        />
      </div>
    );
  }
}

export default App;
