import React, { Component } from 'react';

export default class TableItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hour: 0,
      temperature: 0,
      cloud: 0,
    }

    console.log(props.data)
  }


  render() {
    return (
      <>
        <div className="table-item">

          <span>Hour: {this.state.hour}</span>
          <span>Temperature: {this.state.temperature}</span>
          <span>Cloud: {this.state.cloud}</span>

        </div>
      </>
    )
  }
}
