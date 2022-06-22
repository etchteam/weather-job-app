import React, { useState } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

function WeatherContainer(props) {
    const { locationData, weatherData } = props;

    const [ datetime, setDatetime ] = useState(new Date());

    const units = weatherData.meta.units;
    for (const item in units) {
        if (units[item] === 'celsius') {
            units[item] = '\u00B0C';
        } else if (units[item] === 'degrees') {
            units[item] = '\u00B0';
        }
    }

    return (
        <div className="row vh-100">
            <LeftPanel
                locationData={locationData}
                currentWeather={weatherData.timeseries[0]}
                units={units}
                datetime={datetime}
            />
            <RightPanel
                weatherData={weatherData}
                units={units}
                datetime={datetime}
            />
        </div>
    )
}

export default WeatherContainer;