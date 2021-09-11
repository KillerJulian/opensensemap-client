# openSenseMap Client

Based on API version: `v9.8`

## Install

```sh
yarn add opensensemap-client
```

## Usage

Usage in TypeScript (with ES Modules):

```typescript
import * as client from 'opensensemap-client';

async function start() {
	// Get information about a senseBox
	const r = await client
		.getBox('57000b8745fd40c8196ad04c')
		.catch((e) => console.error(e));

	console.log(JSON.stringify(r));

	// Post new sensor data
	const data: client.TDataPostNewMeasurements = [];
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
```

Usage in JavaScript (with CommonJS):

```js
const client = require('opensensemap-client');

async function start() {
	// Get information about a senseBox
	const r = await client
		.getBox('57000b8745fd40c8196ad04c')
		.catch((e) => console.error(e));

	console.log(JSON.stringify(r));

	// Post new sensor data
	const data = [];
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
```

---

## Listed functions according to API documentation of openSenseMap

- Introduction
- Boxes
	- [Get one senseBox](https://docs.opensensemap.org/#api-Boxes-getBox)
		- Function [getBox](https://killerjulian.github.io/opensensemap-client/modules.html#getBox)
	- [Get all senseBoxes](https://docs.opensensemap.org/#api-Boxes-getBoxes)
		- Function [getBoxes](https://killerjulian.github.io/opensensemap-client/modules.html#getBoxes)
	- [Post new senseBox](https://docs.opensensemap.org/#api-Boxes-postNewBox)
		- Function [postNewBox](https://killerjulian.github.io/opensensemap-client/modules.html#postNewBox)
	- [Update a senseBox](https://docs.opensensemap.org/#api-Boxes-updateBox)
		- Function [updateBox](https://killerjulian.github.io/opensensemap-client/modules.html#updateBox)
	- [Mark a senseBox and its measurements for deletion](https://docs.opensensemap.org/#api-Boxes-deleteBox)
		- Function [deleteBox](https://killerjulian.github.io/opensensemap-client/modules.html#deleteBox)
	- [Download the Arduino script for your senseBox](https://docs.opensensemap.org/#api-Boxes-getSketch)
		- Function [getSketch](https://killerjulian.github.io/opensensemap-client/modules.html#getSketch)
	- [Get locations of a senseBox](https://docs.opensensemap.org/#api-Boxes-getBoxLocations)
		- Function [getBoxLocations](https://killerjulian.github.io/opensensemap-client/modules.html#getBoxLocations)
- Interpolation
	- [Get a Inverse Distance Weighting Interpolation as FeatureCollection](https://docs.opensensemap.org/#api-Interpolation-calculateIdw)
		- Function [calculateIdw](https://killerjulian.github.io/opensensemap-client/modules.html#calculateIdw)
- Measurements
	- [Post new measurement](https://docs.opensensemap.org/#api-Measurements-postNewMeasurement)
		- Function [postNewMeasurement](https://killerjulian.github.io/opensensemap-client/modules.html#postNewMeasurement)
	- [Get the 10000 latest measurements for a sensor](https://docs.opensensemap.org/#api-Measurements-getData)
		- Function [getData](https://killerjulian.github.io/opensensemap-client/modules.html#getData)
	- [Delete measurements of a sensor](https://docs.opensensemap.org/#api-Measurements-deleteMeasurements)
		- Function [deleteMeasurements](https://killerjulian.github.io/opensensemap-client/modules.html#deleteMeasurements)
	- [Get latest measurements for a phenomenon as CSV](https://docs.opensensemap.org/#api-Measurements-getDataMulti)
		- Function [getDataMulti](https://killerjulian.github.io/opensensemap-client/modules.html#getDataMulti)
	- [Get latest measurements of a senseBox](https://docs.opensensemap.org/#api-Measurements-getLatestMeasurements)
		- Function [getLatestMeasurements](https://killerjulian.github.io/opensensemap-client/modules.html#getLatestMeasurements)
	- [Post multiple new measurements](https://docs.opensensemap.org/#api-Measurements-postNewMeasurements)
		- Function [postNewMeasurements](https://killerjulian.github.io/opensensemap-client/modules.html#postNewMeasurements)
- Misc
	- [Get some statistics about the database](https://docs.opensensemap.org/#api-Misc-getStatistics)
		- Function [getStatistics](https://killerjulian.github.io/opensensemap-client/modules.html#getStatistics)
	- [print all routes](https://docs.opensensemap.org/#api-Misc-printRoutes)
		- Function [printRoutes](https://killerjulian.github.io/opensensemap-client/modules.html#printRoutes)
- Statistics
	- [Compute basic descriptive statistics over specified time windows](https://docs.opensensemap.org/#api-Statistics-descriptive)
		- Function [descriptive](https://killerjulian.github.io/opensensemap-client/modules.html#descriptive)
- Users
	- [Register new](https://docs.opensensemap.org/#api-Users-register)
		- Function [register](https://killerjulian.github.io/opensensemap-client/modules.html#register)
	- [Delete user, all of its boxes and all of its boxes measurements](https://docs.opensensemap.org/#api-Users-deleteUser)
		- Function [deleteUser](https://killerjulian.github.io/opensensemap-client/modules.html#deleteUser)
	- [Get details](https://docs.opensensemap.org/#api-Users-getUser)
		- Function [getUser](https://killerjulian.github.io/opensensemap-client/modules.html#getUser)
	- [Refresh Authorization](https://docs.opensensemap.org/#api-Users-refresh_auth)
		- Function [refreshAuth](https://killerjulian.github.io/opensensemap-client/modules.html#refreshAuth)
	- [Sing in](https://docs.opensensemap.org/#api-Users-sign_in)
		- Function [singIn](https://killerjulian.github.io/opensensemap-client/modules.html#singIn)
	- [Sing out](https://docs.opensensemap.org/#api-Users-sign_out)
		- Function [singOut](https://killerjulian.github.io/opensensemap-client/modules.html#singOut)
	- [Update user details](https://docs.opensensemap.org/#api-Users-updateUser)
		- Function [updateUser](https://killerjulian.github.io/opensensemap-client/modules.html#updateUser)
	- [confirm email address](https://docs.opensensemap.org/#api-Users-confirm_email)
		- Function [confirmEmail](https://killerjulian.github.io/opensensemap-client/modules.html#confirmEmail)
	- [list all boxes of the signed in user](https://docs.opensensemap.org/#api-Users-getUserBoxes)
		- Function [getUserBoxes](https://killerjulian.github.io/opensensemap-client/modules.html#getUserBoxes)
		- NOT USABLE!
	- [request a resend of the email confirmation](https://docs.opensensemap.org/#api-Users-resend_email_confirmation)
		- Function [resendEmailConfirmation](https://killerjulian.github.io/opensensemap-client/modules.html#resendEmailConfirmation)
	- [request password reset](https://docs.opensensemap.org/#api-Users-request_password_reset)
		- Function [requestPasswordReset](https://killerjulian.github.io/opensensemap-client/modules.html#requestPasswordReset)
	- [reset password with passwordResetToken](https://docs.opensensemap.org/#api-Users-password_reset)
		- Function [passwordReset](https://killerjulian.github.io/opensensemap-client/modules.html#passwordReset)

---

## Author

👤 **KillerJulian <info@killerjulian.de>**

- Github: [@KillerJulian](https://github.com/KillerJulian)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/KillerJulian/opensensemap-client/issues). You can also take a look at the [contributing guide](https://github.com/KillerJulian/opensensemap-client/blob/master/CONTRIBUTING.md).