const request = require('request');

const weatherKey = require('../apikeys.json').weatherKey;

var getWeather = (results, callback) => {
	request({
		url: `https://api.darksky.net/forecast/${weatherKey}/34.0789,-118.2641`,
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