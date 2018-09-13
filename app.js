const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

//Configure commandline input options
const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

//Find Lat/Long for given address and return temperature to the user
geocode.geocodeAddress(argv.address, (errorMessage, latLongResults) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		weather.getWeather(latLongResults, (errorMessage, weatherResults) => {
			if (errorMessage) {
				console.log(errorMessage);
			}else{
				console.log(weatherResults);
			}
		})
	}
});









