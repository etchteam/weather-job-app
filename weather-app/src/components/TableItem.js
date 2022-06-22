import React, { Component } from 'react';

import arrowUp from './../assets/images/arrow-up.png';

export default class TableItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hour: 0,
      temperature: 0,
      cloud: 0,
      windSpeed: 0,
      windDirection: 0,
      humidity: 0,
      weatherSymbol: 'clear',
      weatherIconUrl: '',
      precipitation: 0,
    }

    this.state.hour = props.hour + ':00'
    this.state.temperature = props.data.air_temperature;
    this.state.cloud = props.data.cloud_area_fraction;
    this.state.windSpeed = Math.ceil(props.data.wind_speed * 2.23694); // m/s to mph
    this.state.windDirection = props.data.wind_from_direction;
    this.state.humidity = props.data.relative_humidity;

    if (props.data.weather_symbol) {
      this.state.weatherSymbol = props.data.weather_symbol;
      this.state.weatherIconUrl = 'https://api.met.no/images/weathericons/svg/' + this.state.weatherSymbol + '.svg';
    }

    if (props.data.precipitation) {
      this.state.precipitation = props.data.precipitation_amount;
    }
  }


  render() {
    return (
      <>
        <div className="table-item">

          <span className="item-time">{this.state.hour}</span>

          <span className="item-temperature">{this.state.temperature} <span className="item-temperature-degrees">&deg;C</span></span>
    
          {this.state.weatherIconUrl !== '' ? (
            <img src={this.state.weatherIconUrl} className="item-weather-symbol" />
          ) : ''}

          <div className="wind-directional">
            <img src={arrowUp} style={{transform: `rotate(${this.state.windDirection}deg)` }} className="wind-directional-arrow" />
            <span className="wind-directional-speed">{this.state.windSpeed} mph</span>
          </div>

          <div className="other-attributes">
            <span className="other-attribute"><strong>Cloud:</strong> {this.state.cloud}%</span>
            <span className="other-attribute"><strong>Humidity %:</strong> {this.state.humidity}%</span>
          </div>

        </div>
      </>
    )
  }
}
