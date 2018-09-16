const request = require('request');

const weatherKey = require('../apikeys.json').weatherKey;

var getWeather = (latLongResults, callback) => {
	var latitude = latLongResults.latitude;
	var longitude = latLongResults.longitude;

	request({
		url: `https://api.darksky.net/forecast/${weatherKey}/${latitude},${longitude}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to forecast servers');
		} else if ( response.statusCode === 400 ) {
			callback('Unable to find the weather for that address');
		} else if ( response.statusCode === 200) {
			callback(undefined, `It is ${body.currently.temperature} degrees and it's ${body.currently.summary.toLowerCase()} outside`);
		}
	});
}

module.exports.getWeather = getWeather;