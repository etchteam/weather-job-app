import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

function WeatherContainer(props) {
    const { locationData, weatherData } = props;

    return (
        <div className="row vh-100">
            <LeftPanel
                locationData={locationData}
                currentWeather={weatherData.timeseries[0]}
            />
            <RightPanel
                weatherData={weatherData}
            />
        </div>
    )
}

export default WeatherContainer;