import React, { Component } from 'react';
import axios from 'axios';

import Table from '../components/Table';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      units: [],
      todaysWeather: {},
      tomorrowsWeather: {},
      loading: true,
      dateToday: '',
      dateTomorrow: '',
    };

    const date = new Date();
    const fullDateToday = date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    this.state.dateToday = fullDateToday + ' ' ;
    
    date.setDate(date.getDate() + 1);
    const fullDateTomorrow = date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    this.state.dateTomorrow = fullDateTomorrow + ' ' ;
  }

  componentDidMount() {
    this.retrieveWeatherData();
  }

  retrieveWeatherData() {
    axios({
      method: 'get',
      url: 'http://localhost:3001/api/weather-data',
    }).then(res => {

      // Success
      if (res.data && res.data.units && res.data.days) {

        // Dataset structure is available - unpack the data.
        const days = res.data.days;

        const date = new Date();
        const todaysDate = date.getDate();
        const todaysWeather = days[todaysDate];

        date.setDate(date.getDate() + 1);
        const tomorrowsDate = date.getDate();
        const tomorrowsWeather = days[tomorrowsDate];

        this.setState({
          units: res.data.units,
          todaysWeather: todaysWeather,
          tomorrowsWeather: tomorrowsWeather,
          loading: false,
        });

      }

    }).catch(err => {

      // Error
      this.setState({
        loading: false,
      });

    });
  }

  render() {

    if (this.state.loading) {

      return(
        <>
          <h1>Loading data..</h1>
        </>
      )

    } else {

      return(
        <>
          <div className="weather-wrap">
            <h1 className="weather-title">Today's Weather</h1>
            <h3 className="date-today">{this.state.dateToday}</h3>
            <Table 
              units={this.state.units}
              weather={this.state.todaysWeather}></Table>
          </div>
          
          <div className="weather-wrap">
            <h1 className="weather-title">Tomorrow's Weather</h1>
            <h3 className="date-today">{this.state.dateTomorrow}</h3>
            <Table 
              units={this.state.units}
              weather={this.state.tomorrowsWeather}></Table>
          </div>
        </>
      )

    }
  }

}