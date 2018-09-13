var request = require('request');

const mapsKey = require('../apikeys.json').mapsKey;


var geocodeAddress = (address, callback) => {
	var encodedAddress = encodeURIComponent(address);

	request({
		url: `http://www.mapquestapi.com/geocoding/v1/address?key=${mapsKey}&location=${encodedAddress}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to mapquest servers');
		} else if ( body.info.statuscode > 0 ) {
			callback('Unable to find that address');
		} else if ( body.info.statuscode === 0 ) {
			callback(undefined, {
				address: body.results[0].providedLocation.location,
				latitude: body.results[0].locations[0].latLng.lat,
				longitude: body.results[0].locations[0].latLng.lng
			});
		}
	});
};

module.exports = {
	geocodeAddress
};
