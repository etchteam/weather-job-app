import React, { useState, useEffect } from 'react';

const weatherIconLegends = require('./weather_icon_legend.json');

function WeatherIcon(props) {
    const { width, weatherData } = props;
    const [ symbolCode, setSymbolCode ] = useState('');
    const [ legend, setLegend ] = useState('');

    useEffect(() => {
        if (weatherData.hasOwnProperty("next_1_hours") && weatherData.next_1_hours.hasOwnProperty("summary")) {
            setSymbolCode(weatherData.next_1_hours.summary.symbol_code);
        } else if (weatherData.hasOwnProperty("next_6_hours") && weatherData.next_6_hours.hasOwnProperty("summary")) {
            setSymbolCode(weatherData.next_6_hours.summary.symbol_code);
        } else if (weatherData.hasOwnProperty("next_12_hours") && weatherData.next_12_hours.hasOwnProperty("summary")) {
            setSymbolCode(weatherData.next_12_hours.summary.symbol_code);
        }
    }, [weatherData]);

    useEffect(() => {
        setLegend(symbolCode ? weatherIconLegends[symbolCode.split("_")[0]]["desc_en"] : '')
    }, [symbolCode])

    return (
        <img
            src={symbolCode ? `./weathericons/${symbolCode}.svg` : ''}
            alt={legend}
            style={{ width: width }}
        />
    )
};

export default WeatherIcon;