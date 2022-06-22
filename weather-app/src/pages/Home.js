import React, { Component } from 'react';
import axios from 'axios';

import Table from '../components/Table';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      units: [],
      days: [],
      loading: true,
      dateToday: '',
    };

    const date = new Date();
    const dayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    this.state.dateToday = dayOfWeek + ' ' ;
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
        this.setState({
          units: res.data.units,
          days: res.data.days,
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
            <h1 className="weather-title">Weather</h1>
            <h2 className="date-today">{this.state.dateToday}</h2>
            <Table 
              units={this.state.units}
              days={this.state.days}></Table>
          </div>
        </>
      )

    }
  }

}