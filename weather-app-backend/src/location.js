const axios = require('axios').default;

const ipInfoToken = '35c34ef50024d0';

module.exports = {
  lat: '',
  lng: '',
  error: '',
  getLatLng: function(ip) {

    const this_ = this;

    // Request the user's IP info.
    axios.get(`https://ipinfo.io/${ip}?token=${ipInfoToken}`)
    .then(function(res) {

      if (res.data) {
        const locationExploded = res.data.loc.split(',');

        this_.lat = parseFloat(locationExploded[0]);
        this_.lng = parseFloat(locationExploded[1]);
      }

    })
    .catch(function(err) {
      
      this_.error = err;

    });

  },
};