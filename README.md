# openSenseMap Client

Based on API version: `v9.8`

## Install

```sh
yarn install opensensemap-client
```

## Usage

Usage in TypeScript (with ES Modules):

```typescript
import * as client from 'opensensemap-client';

async function start() {
	const r = await client
		.getBox('57000b8745fd40c8196ad04c')
		.catch((e) => console.error(e));

	console.log(JSON.stringify(r));
}

start();
```

Usage in JavaScript (with CommonJS):

> You can also find the code in the `examples` folder.

```js
const client = require('opensensemap-client');

async function start() {
	const r = await client
		.getBox('57000b8745fd40c8196ad04c')
		.catch((e) => console.error(e));

	console.log(JSON.stringify(r));
}

start();
```

---

## Listed functions according to API documentation of openSenseMap

- Introduction
- Boxes
	- [Get one senseBox](https://docs.opensensemap.org/#api-Boxes-getBox)
		- Function [getBox]()
	- [Get all senseBoxes](https://docs.opensensemap.org/#api-Boxes-getBoxes)
		- Function [getBoxes]()
	- [Post new senseBox](https://docs.opensensemap.org/#api-Boxes-postNewBox)
		- Function [postNewBox]()
	- [Update a senseBox](https://docs.opensensemap.org/#api-Boxes-updateBox)
		- Function [updateBox]()
	- [Mark a senseBox and its measurements for deletion](https://docs.opensensemap.org/#api-Boxes-deleteBox)
		- Function [deleteBox]()
	- [Download the Arduino script for your senseBox](https://docs.opensensemap.org/#api-Boxes-getSketch)
		- Function [getSketch]()
	- [Get locations of a senseBox](https://docs.opensensemap.org/#api-Boxes-getBoxLocations)
		- Function [getBoxLocations]()
- Interpolation
	- [Get a Inverse Distance Weighting Interpolation as FeatureCollection](https://docs.opensensemap.org/#api-Interpolation-calculateIdw)
		- Function [calculateIdw]()
- Measurements
	- [Post new measurement](https://docs.opensensemap.org/#api-Measurements-postNewMeasurement)
		- Function [postNewMeasurement]()
	- [Get the 10000 latest measurements for a sensor](https://docs.opensensemap.org/#api-Measurements-getData)
		- Function [getData]()
	- [Delete measurements of a sensor](https://docs.opensensemap.org/#api-Measurements-deleteMeasurements)
		- Function [deleteMeasurements]()
	- [Get latest measurements for a phenomenon as CSV](https://docs.opensensemap.org/#api-Measurements-getDataMulti)
		- Function [getDataMulti]()
	- [Get latest measurements of a senseBox](https://docs.opensensemap.org/#api-Measurements-getLatestMeasurements)
		- Function [getLatestMeasurements]()
	- [Post multiple new measurements](https://docs.opensensemap.org/#api-Measurements-postNewMeasurements)
		- Function [postNewMeasurements]()
- Misc
	- [Get some statistics about the database](https://docs.opensensemap.org/#api-Misc-getStatistics)
		- Function [getStatistics]()
	- [print all routes](https://docs.opensensemap.org/#api-Misc-printRoutes)
		- Function [printRoutes]()
- Statistics
	- [Compute basic descriptive statistics over specified time windows](https://docs.opensensemap.org/#api-Statistics-descriptive)
		- Function [descriptive]()
- Users
	- [Register new](https://docs.opensensemap.org/#api-Users-register)
		- Function [register]()
	- [Delete user, all of its boxes and all of its boxes measurements](https://docs.opensensemap.org/#api-Users-deleteUser)
		- Function [deleteUser]()
	- [Get details](https://docs.opensensemap.org/#api-Users-getUser)
		- Function [getUser]()
	- [Refresh Authorization](https://docs.opensensemap.org/#api-Users-refresh_auth)
		- Function [refreshAuth]()
	- [Sing in](https://docs.opensensemap.org/#api-Users-sign_in)
		- Function [singIn]()
	- [Sing out](https://docs.opensensemap.org/#api-Users-sign_out)
		- Function [singOut]()
	- [Update user details](https://docs.opensensemap.org/#api-Users-updateUser)
		- Function [updateUser]()
	- [confirm email address](https://docs.opensensemap.org/#api-Users-confirm_email)
		- Function [confirmEmail]()
	- [list all boxes of the signed in user](https://docs.opensensemap.org/#api-Users-getUserBoxes)
		- Function [getUserBoxes]()
		- NOT USABLE!
	- [request a resend of the email confirmation](https://docs.opensensemap.org/#api-Users-resend_email_confirmation)
		- Function [resendEmailConfirmation]()
	- [request password reset](https://docs.opensensemap.org/#api-Users-request_password_reset)
		- Function [requestPasswordReset]()
	- [reset password with passwordResetToken](https://docs.opensensemap.org/#api-Users-password_reset)
		- Function [passwordReset]()

---

## Author

👤 **KillerJulian <info@killerjulian.de>**

- Github: [@KillerJulian](https://github.com/KillerJulian)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/KillerJulian/opensensemap-client/issues). You can also take a look at the [contributing guide](https://github.com/KillerJulian/opensensemap-client/blob/master/CONTRIBUTING.md).