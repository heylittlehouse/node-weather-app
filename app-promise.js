const yargs = require('yargs');
const axios = require('axios');

const mapsKey = require('./apikeys.json').mapsKey;
const weatherKey = require('./apikeys.json').weatherKey;

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



var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapsKey}&location=${encodedAddress}`;


axios.get(geocodeUrl).then((response) => {
	//console.log(JSON.stringify(response.data, undefined, 2));

	var latitude = response.data.results[0].locations[0].latLng.lat;
	var longitude = response.data.results[0].locations[0].latLng.lng;
	var weatherURL = `https://api.darksky.net/forecast/${weatherKey}/${latitude},${longitude}`;
	return axios.get(weatherURL);
}).then((response) => {
	console.log(`It is ${response.data.currently.temperature} degrees and it's ${response.data.currently.summary.toLowerCase()} outside`);
}).catch((e) => {
	console.log(e);
});


