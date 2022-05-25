import axios from 'axios';
import {
	Exposure,
	Location,
	Model,
	MQTT,
	RFC3339Date,
	Sensor,
	SensorDeleted,
	SensorEdited,
	SensorNew,
	SensorTemplates,
	TTN
} from './types';

//
// https://docs.opensensemap.org/#api-Boxes
//

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBox
 */
export async function getBox(senseBoxId: string): Promise<BoxData> {
	const r = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}`, {
		params: {
			format: 'json'
		}
	});

	return r.data;
}

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBoxes
 */
export async function getBoxes(bbox: string, options?: GetBoxesOptions): Promise<BoxData> {
	if (options?.date && options.date instanceof Date) {
		options.date = options.date.toISOString();
	}

	if (options?.grouptag && Array.isArray(options.grouptag)) {
		options.grouptag = options.grouptag.join();
	}

	if (options?.exposure && Array.isArray(options.exposure)) {
		options.exposure = options.exposure.join();
	}

	const r = await axios.get('https://api.opensensemap.org/boxes', {
		params: Object.assign(
			{
				format: 'json',
				bbox
			},
			options
		)
	});

	return r.data;
}

export type GetBoxesOptions = {
	date?: RFC3339Date | Date;
	phenomenon?: string;
	grouptag?: string | string[];
	model?: Model;
	classify?: boolean;
	minimal?: boolean;
	full?: boolean;
	near?: string;
	maxDistance?: number;
	exposure?: string | Exposure[];
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-postNewBox
 */
export async function postNewBox(
	name: string,
	exposure: Exposure,
	location: Location,
	authorization: string,
	options?: PostNewBoxOptions
): Promise<{
	message: 'Box successfully created';
	data: BoxData;
}> {
	const r = await axios.post(
		'https://api.opensensemap.org/boxes',
		Object.assign(
			{
				name,
				exposure,
				location
			},
			options
		),
		{
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		}
	);

	return r.data;
}

export type PostNewBoxOptions = {
	grouptag?: string;
	model?: Model;
	sensors?: Sensor[];
	sensorTemplates?: SensorTemplates[];
	mqtt?: MQTT;
	ttn?: TTN;
	useAuth?: boolean;
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateBox
 */
export async function updateBox(
	senseBoxId: string,
	authorization: string,
	options: UpdateBoxOptions
): Promise<{
	code: 'Ok';
	data: BoxData;
}> {
	const r = await axios.put(`https://api.opensensemap.org/boxes/${senseBoxId}`, options, {
		headers: {
			Authorization: `Bearer ${authorization}`
		}
	});

	return r.data;
}

export type UpdateBoxOptions = {
	name?: string;
	grouptag?: string[];
	location?: Location;
	sensors?: (SensorEdited | SensorNew | SensorDeleted)[];
	mqtt?: MQTT;
	ttn?: TTN;
	description?: string;
	image?: string;
	addons?: Record<string | number, string | number>;
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-deleteBox
 */
export async function deleteBox(
	senseBoxId: string,
	authorization: string,
	password: string
): Promise<{
	code: 'Ok';
	message: 'box and all associated measurements marked for deletion';
}> {
	const r = await axios.delete(`https://api.opensensemap.org/boxes/${senseBoxId}`, {
		headers: {
			Authorization: `Bearer ${authorization}`
		},
		data: {
			password
		}
	});

	return r.data;
}

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getSketch
 */
export async function getSketch(senseBoxId: string, authorization: string, options?: GetSketchOptions): Promise<string> {
	const r = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/script`, {
		headers: {
			Authorization: `Bearer ${authorization}`
		},
		params: options
	});

	return r.data;
}

export type GetSketchOptions = {
	serialPort?: 'Serial1' | 'Serial2';
	soilDigitalPort?: 'A' | 'B' | 'C';
	soundMeterPort?: 'A' | 'B' | 'C';
	windSpeedPort?: 'A' | 'B' | 'C';
	ssid?: string;
	password?: string;
	devEUI?: string;
	appEUI?: string;
	appKey?: string;
	display_enabled?: boolean;
};

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBoxLocations
 */
export async function getBoxLocations(senseBoxId: string, options?: GetBoxLocationsOptions): Promise<BoxCurrentLocation[]> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	const r = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/locations`, {
		params: Object.assign(
			{
				format: 'json'
			},
			options
		)
	});

	return r.data;
}

export type GetBoxLocationsOptions = {
	'from-date': RFC3339Date | Date;
	'to-date': RFC3339Date | Date;
};

export interface BoxData {
	_id: string;
	name: string;
	createdAt: RFC3339Date;
	exposure: Exposure;
	model: string;
	description?: string;
	grouptag?: string[];
	weblink?: string;
	image?: string;
	currentLocation: BoxCurrentLocation;
	updatedAt: RFC3339Date;
	sensors: BoxSensors[];
	loc?: {
		geometry: {
			timestamp: RFC3339Date;
			coordinates: Location;
			type: string;
		};
		type: string;
	}[];
	lastMeasurementAt?: RFC3339Date;
	integrations?: { mqtt: MQTT | { enabled: false }; ttn?: TTN };
	access_token?: string;
	useAuth?: boolean;
}

export interface BoxSensors {
	_id: string;
	title: string;
	unit: string;
	sensorType: string;
	icon?: string;
	lastMeasurement?: LastMeasurement | string;
}

export interface LastMeasurement {
	value: string;
	createdAt: RFC3339Date;
}

export interface BoxCurrentLocation {
	coordinates: Location;
	type: string;
	timestamp: RFC3339Date;
}
