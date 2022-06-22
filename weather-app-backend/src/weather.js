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
            
            // Insert the data for this hour
            this_.data.days[date.getDate()].hourly.push({
              hour: date.getHours(),
              data: hour.data.instant.details,
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