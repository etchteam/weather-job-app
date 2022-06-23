import WeatherIcon from './WeatherIcon';

function CurrentWeather(props) {
    const { weather, units } = props;

    function displayWeatherItems(data) {
        return Object.entries(data).map(([key,value]) => {
            return (
                <li key={key}>
                    {formatWeatherKey(key)}: <b>{value.toString()}{units[key]}</b>
                </li>
            );
        })
    }
    
    function formatWeatherKey(key) {
        return key.split('_').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ');
    }
    
    return (
        <div>
            <div className='text-center mb-4 mt-0'>
                <WeatherIcon width={150} weatherData={weather.data} />
            </div>
            <div className='border border-2 rounded-3 bg-light text-body p-2'>
                <h4>Current Weather:</h4>
                <ul>{displayWeatherItems(weather.data.instant.details)}</ul>
                <h5>In the next hour:</h5>
                <ul>{displayWeatherItems(weather.data.next_1_hours.details)}</ul>
                <h5>In the next 6 hours:</h5>
                <ul>{displayWeatherItems(weather.data.next_6_hours.details)}</ul>
            </div>
        </div>
    )
}

export default CurrentWeather;