import React, { Component } from 'react';

import TableItem from './TableItem';

export default class Table extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      todaysWeather: {},
    }

    // Get the current date
    const date = new Date();
    const currentDate = date.getDate();

    // This can be extended to show a weekly format of weather 
    // but for this we will only show today's.
    this.state.todaysWeather = props.days[currentDate];

    console.log(this.state.todaysWeather);
  }

  render() {

    return(
      <>
        <div className="weather-table">

          {this.state.todaysWeather.hourly.map((hour) => {
            return(<TableItem key={hour} hour={hour.hour} data={hour.data}></TableItem>)
          })}

        </div>
      </>
    )

  }
}