const request = require('request');
const yargs = require('yargs');

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

console.log(argv);

var encodedAddress = encodeURIComponent(argv.a);

var key = 'lSI30OwkAgJXIuZ9kDEkxPd5Xe6b4dRr';

request({
	url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encodedAddress}`,
	json: true
}, (error, response, body) => {
	console.log(`Address: ${body.results[0].providedLocation.location}`);
	console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
	console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
});