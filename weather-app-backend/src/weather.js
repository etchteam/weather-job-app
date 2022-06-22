const axios = require('axios').default;

module.exports = {
  data: {
    units: {},
    days: {},
  },
  dataReady: false,
  getWeatherData: function(lat, lng) {
    const this_ = this;

    if (!this.dataReady) {

      axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/?lat=${lat}&lon=${lng}&altitude=0`,
        {
          headers: {
            'User-Agent': 'Weather-App-Agent',
          },
        })
      .then(function(res) {

        if (res.data && res.data.properties) {

          // Get the units
          this_.data.units = res.data.properties.meta.units;

          // Get the weather for each hour
          res.data.properties.timeseries.forEach((hour) => {
            
            // Humanise date.
            let date = new Date(hour.time);

            // Check if the day exists in the dataset
            if (this_.data.days[date.getDate()] === undefined) {
              // Not found - create it.
              this_.data.days[date.getDate()] = {
                hourly: [],
              };
            }

            // Concatenate details object with 'next 1 hours' precipitation & cloud symbol 
            let hourData = hour.data.instant.details;

            if (hour.data.next_1_hours) {
              hourData.weather_symbol = hour.data.next_1_hours.summary.symbol_code;
              hourData.precipitation_amount = hour.data.next_1_hours.details.precipitation_amount;
            }
            
            // Insert the data for this hour
            this_.data.days[date.getDate()].hourly.push({
              hour: date.getHours(),
              data: hourData,
            });

          });

          // Done.
          this_.dataReady = true;

        }

      })
      .catch(function(err) {

        console.log(err);

      });

    }
  },
};