var request = require('request');

var key = 'lSI30OwkAgJXIuZ9kDEkxPd5Xe6b4dRr';


var geocodeAddress = (address) => {
	var encodedAddress = encodeURIComponent(address);

	request({
		url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encodedAddress}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			console.log('Unable to connect to mapquest servers');
		} else if ( body.info.statuscode > 0 ) {
			console.log('Unable to find that address')
		} else if ( body.info.statuscode === 0 ) {
			console.log(`Address: ${body.results[0].providedLocation.location}`);
			console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
			console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
		}
	});
};

module.exports = {
	geocodeAddress
};
