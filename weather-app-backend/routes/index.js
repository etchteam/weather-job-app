var express = require('express');
var router = express.Router();

const location = require('./../src/location');

/* GET weather data */
router.get('/api/weather-data', function(req, res, next) {

  var response = '';

  const retrieveLatLng = new Promise((resolve, reject) => {
    location.getLatLng();
    
    // Wait for response
    var waitTimer = setInterval(() => {
      if (location.lat !== '' && location.lng !== '') {

        // Lat/lng has been retrieved from API.
        response = [location.lat, location.lng];

        resolve();
        clearInterval(waitTimer);
      } else if (location.error !== '') {

        // An error has occurred.
        console.log(location.error);
        resolve();
        clearInterval(waitTimer);

      }
    }, 150);
  })

  retrieveLatLng.then(() => {

    res.send(response);

  });
});

module.exports = router;
