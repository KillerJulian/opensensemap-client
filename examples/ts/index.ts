import * as client from '../../dist/index';

async function start() {
	// Get information about a senseBox
	const r = await client
		.getBox('57000b8745fd40c8196ad04c')
		.catch((e) => console.error(e));

	console.log(JSON.stringify(r));

	// Post new sensor data
	const data: client.PostNewMeasurementsData = [];
	const authToken = 'Your senseBox token';

	data.push({
		sensor: 'Your sensorId',
		value: 'Your data'
	});

	client
		.postNewMeasurements('Your senseBoxId', data, authToken)
		.catch(console.error);
}

start();
