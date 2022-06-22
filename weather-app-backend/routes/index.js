var express = require('express');
var router = express.Router();

const location = require('./../src/location');
const weather = require('./../src/weather');

/* GET weather data */
router.get('/api/weather-data', function(req, res, next) {

  const retrieveLatLng = new Promise((resolve, reject) => {
    var ip = req.socket.remoteAddress;

    // If IP is local (ie. ::1) then just set it to another IP for testability
    if (ip == '::1') {
      ip = '90.242.4.94';
    }
    location.getLatLng(ip);
    
    // Wait for response
    var waitTimer = setInterval(() => {
      if (location.lat !== '' && location.lng !== '') {

        // Lat/Lng has been retrieved.
        resolve();
        clearInterval(waitTimer);

      } else if (location.error !== '') {

        // An error has occurred.
        console.log(location.error);
        resolve();
        clearInterval(waitTimer);

      }
    }, 150);
  });

  // Retrieve the lat/lng coords.
  retrieveLatLng.then(() => {

    // Now retrieve weather data based on lat/lng coords.
    const retrieveWeatherData = new Promise((resolve, reject) => {
      if (location.lat !== '' && location.lng !== '') {
        weather.getWeatherData(location.lat, location.lng);

        // Wait for response
        var waitTimer = setInterval(() => {
          if (weather.dataReady) {

            // Data ready.
            resolve();
            clearInterval(waitTimer);

          }
        }, 150);
      }
    });

    retrieveWeatherData.then(() => {

      // Finally, display the data.
      res.send(weather.data);

    });

  });

});

module.exports = router;
