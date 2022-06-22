import React, { Component } from 'react';

import TableItem from './TableItem';

export default class Table extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      weather: {},
    }

    this.state.weather = props.weather;

  }

  render() {

    return(
      <>
        <div className="weather-table">

          {this.state.weather.hourly.map((hour) => {
            return(<TableItem key={hour} hour={hour.hour} data={hour.data}></TableItem>)
          })}

        </div>
      </>
    )

  }
}