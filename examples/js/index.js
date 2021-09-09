/* eslint-disable @typescript-eslint/no-var-requires */
const a = require('../../dist/index');

async function start() {
	const r = await a
		.getBox('57000b8745fd40c8196ad04c')
		.catch((e) => console.error(e));

	console.log(JSON.stringify(r));
}

start();
