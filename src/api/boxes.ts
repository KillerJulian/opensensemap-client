import axios from 'axios';
import {
	IMQTT,
	ISensor,
	ISensorUpdate,
	ITTN,
	TExposure,
	TLocation,
	TModel,
	TRFC3339Date,
	TSensorTemplates
} from './types';

//
// https://docs.opensensemap.org/#api-Boxes
//

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBox
 */
export async function getBox(senseBoxId: string): Promise<IBoxData[]> {
	const r = await axios.get(
		`https://api.opensensemap.org/boxes/${senseBoxId}`,
		{
			params: {
				format: 'json'
			}
		}
	);

	return r.data;
}

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBoxes
 */
export async function getBoxes(
	bbox: string,
	optional?: {
		date?: TRFC3339Date | Date;
		phenomenon?: string;
		grouptag?: string | string[];
		model?: TModel;
		classify?: boolean;
		minimal?: boolean;
		full?: boolean;
		near?: string;
		maxDistance?: number;
		exposure?: string | TExposure[];
	}
): Promise<IBoxData> {
	if (optional?.date && optional.date instanceof Date) {
		optional.date = optional.date.toISOString();
	}

	if (optional?.grouptag && Array.isArray(optional.grouptag)) {
		optional.grouptag = optional.grouptag.join();
	}

	if (optional?.exposure && Array.isArray(optional.exposure)) {
		optional.exposure = optional.exposure.join();
	}

	const r = await axios.get('https://api.opensensemap.org/boxes', {
		params: Object.assign(
			{
				format: 'json',
				bbox
			},
			optional
		)
	});

	return r.data;
}

/**
 * @see https://docs.opensensemap.org/#api-Boxes-postNewBox
 */
export async function postNewBox(
	name: string,
	exposure: TExposure,
	location: TLocation,
	authorization: string,
	optional?: {
		grouptag?: string;
		model?: TModel;
		sensors?: ISensor[];
		sensorTemplates?: TSensorTemplates;
		mqtt?: IMQTT;
		ttn?: ITTN;
		useAuth?: boolean;
	}
): Promise<{
	message: 'Box successfully created';
	data: IBoxData;
}> {
	const r = await axios.post(
		'https://api.opensensemap.org/boxes',
		Object.assign(
			{
				name,
				exposure,
				location
			},
			optional
		),
		{
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		}
	);

	return r.data;
}

/**
 * @see https://docs.opensensemap.org/#api-Boxes-updateBox
 */
export async function updateBox(
	senseBoxId: string,
	authorization: string,
	optional: {
		name?: string;
		grouptag?: string;
		location?: TLocation;
		sensors?: ISensorUpdate;
		mqtt?: IMQTT;
		ttn?: ITTN;
		description?: string;
		image?: string;
		addons?: Record<string | number, string | number>;
	}
): Promise<{
	code: 'Ok';
	data: IBoxData;
}> {
	const r = await axios.put(
		`https://api.opensensemap.org/boxes/${senseBoxId}`,
		optional,
		{
			headers: {
				Authorization: `Bearer ${authorization}`
			}
		}
	);

	return r.data;
}

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
	const r = await axios.delete(
		`https://api.opensensemap.org/boxes/${senseBoxId}`,
		{
			headers: {
				Authorization: `Bearer ${authorization}`
			},
			data: {
				password
			}
		}
	);

	return r.data;
}

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getSketch
 */
export async function getSketch(
	senseBoxId: string,
	authorization: string,
	optional?: {
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
	}
): Promise<string> {
	const r = await axios.get(
		`https://api.opensensemap.org/boxes/${senseBoxId}/script`,
		{
			headers: {
				Authorization: `Bearer ${authorization}`
			},
			params: optional
		}
	);

	return r.data;
}

/**
 * @see https://docs.opensensemap.org/#api-Boxes-getBoxLocations
 */
export async function getBoxLocations(
	senseBoxId: string,
	optional?: {
		'from-date': TRFC3339Date | Date;
		'to-date': TRFC3339Date | Date;
	}
): Promise<IBoxCurrentLocation[]> {
	if (optional?.['from-date'] && optional['from-date'] instanceof Date) {
		optional['from-date'] = optional['from-date'].toISOString();
	}

	if (optional?.['to-date'] && optional['to-date'] instanceof Date) {
		optional['to-date'] = optional['to-date'].toISOString();
	}

	const r = await axios.get(
		`https://api.opensensemap.org/boxes/${senseBoxId}/locations`,
		{
			params: Object.assign(
				{
					format: 'json'
				},
				optional
			)
		}
	);

	return r.data;
}

export interface IBoxData {
	_id: string;
	name: string;
	createdAt: TRFC3339Date;
	exposure: TExposure;
	model: string;
	description?: string;
	grouptag?: string;
	weblink?: string;
	image?: string;
	currentLocation: IBoxCurrentLocation;
	updatedAt: TRFC3339Date;
	sensors: IBoxSensors[];
	loc?: {
		geometry: {
			timestamp: TRFC3339Date;
			coordinates: TLocation;
			type: string;
		};
		type: string;
	}[];
	lastMeasurementAt?: TRFC3339Date;
	integrations?: { mqtt: IMQTT | { enabled: false }; ttn?: ITTN };
	access_token?: string;
	useAuth?: boolean;
}

export interface IBoxSensors {
	title: string;
	unit: string;
	sensorType: string;
	icon?: string;
	_id: string;
	lastMeasurement?: ILastMeasurement | string;
}

export interface ILastMeasurement {
	value: string;
	createdAt: TRFC3339Date;
}

export interface IBoxCurrentLocation {
	timestamp: TRFC3339Date;
	coordinates: TLocation;
	type: string;
}
