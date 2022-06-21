const axios = require('axios').default;

const ipInfoToken = '35c34ef50024d0';

module.exports = {
  lat: '',
  lng: '',
  error: '',
  getLatLng: function() {

    const this_ = this;

    axios.get(`https://ipinfo.io/90.242.4.94?token=${ipInfoToken}`)
    .then(function(res) {

      if (res.data) {
        const locationExploded = res.data.loc.split(',');

        this_.lat = locationExploded[0];
        this_.lng = locationExploded[1];
      }

    })
    .catch(function(err) {
      
      this_.error = err;

    });

  },
};