import axios from 'axios';
import { TAdvancedColumns, TExposure, TLocation, TRFC3339Date } from './types';

//
// https://docs.opensensemap.org/#api-Measurements
//

/**
 * @see https://docs.opensensemap.org/#api-Measurements-postNewMeasurement
 */
export async function postNewMeasurement(
	senseBoxId: string,
	sensorId: string,
	value: string | number,
	authorization?: string,
	optional?: TOpostNewMeasurement
): Promise<'Measurement saved in box'> {
	if (optional?.createdAt && optional.createdAt instanceof Date) {
		optional.createdAt = optional.createdAt.toISOString();
	}

	const r = await axios.post(
		`https://api.opensensemap.org/boxes/${senseBoxId}/${sensorId}`,
		Object.assign(
			{
				value: typeof value === 'string' ? value : value.toString()
			},
			optional
		),
		{
			headers: {
				Authorization: authorization
			}
		}
	);

	return r.data;
}

export type TOpostNewMeasurement = {
	createdAt?: TRFC3339Date | Date;
	location?: TLocation;
};

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getData
 */
export async function getData(
	senseBoxId: string,
	sensorId: string,
	optional?: TOgetData
): Promise<
	{
		value: string;
		location: TLocation;
		createdAt: TRFC3339Date;
	}[]
> {
	if (optional?.['from-date'] && optional['from-date'] instanceof Date) {
		optional['from-date'] = optional['from-date'].toISOString();
	}

	if (optional?.['to-date'] && optional['to-date'] instanceof Date) {
		optional['to-date'] = optional['to-date'].toISOString();
	}

	const r = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/data/${sensorId}`, {
		params: Object.assign({ format: 'json' }, optional)
	});

	return r.data;
}

export type TOgetData = {
	'from-date'?: TRFC3339Date | Date;
	'to-date'?: TRFC3339Date | Date;
	download?: boolean;
	outliers?: 'replace' | 'mark';
	'outlier-window'?: number;
};

/**
 * @see https://docs.opensensemap.org/#api-Measurements-deleteMeasurements
 */
export async function deleteMeasurements(
	senseBoxId: string,
	sensorId: string,
	authorization: string,
	optional?: TOdeleteMeasurements
): Promise<{ code: 'Ok'; message: string }> {
	if (optional?.['from-date'] && optional['from-date'] instanceof Date) {
		optional['from-date'] = optional['from-date'].toISOString();
	}

	if (optional?.['to-date'] && optional['to-date'] instanceof Date) {
		optional['to-date'] = optional['to-date'].toISOString();
	}

	optional?.timestamps?.forEach((element) => {
		if (element && element instanceof Date) {
			element = element.toISOString();
		}
	});

	const r = await axios.delete(`https://api.opensensemap.org/boxes/${senseBoxId}/${sensorId}/measurements`, {
		headers: {
			Authorization: `Bearer ${authorization}`
		},
		data: optional
	});

	return r.data;
}

export type TOdeleteMeasurements = {
	'from-date'?: TRFC3339Date | Date;
	'to-date'?: TRFC3339Date | Date;
	timestamps?: Array<TRFC3339Date | Date>;
	deleteAllMeasurements?: boolean;
};

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getDataMulti
 */
export async function getDataMulti(
	boxId: string[] | undefined,
	bbox: string | undefined,
	phenomenon: string,
	optional?: TOgetDataMulti
): Promise<
	{
		createdAt: TRFC3339Date;
		value: string;
		sensorId: string;
		lat: number;
		lon: number;
	}[]
> {
	if (optional?.['from-date'] && optional['from-date'] instanceof Date) {
		optional['from-date'] = optional['from-date'].toISOString();
	}

	if (optional?.['to-date'] && optional['to-date'] instanceof Date) {
		optional['to-date'] = optional['to-date'].toISOString();
	}

	if (optional?.columns && Array.isArray(optional.columns)) {
		optional.columns = optional.columns.join();
	}

	if (optional?.exposure && Array.isArray(optional.exposure)) {
		optional.exposure = optional.exposure.join();
	}

	const r = await axios.get('https://api.opensensemap.org/boxes/data', {
		params: Object.assign(
			{
				format: 'json',
				boxId: boxId?.join(),
				bbox,
				phenomenon
			},
			optional
		)
	});

	return r.data;
}

export type TOgetDataMulti = {
	'from-date'?: TRFC3339Date | Date;
	'to-date'?: TRFC3339Date | Date;
	columns?: string | TAdvancedColumns[];
	download?: boolean;
	exposure?: string | TExposure[];
};

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getLatestMeasurements
 */
export async function getLatestMeasurements(senseBoxId: string): Promise<{
	_id: string;
	sensors: IGetLatestMeasurement[];
}> {
	const r = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/sensors`);

	return r.data;
}

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getLatestMeasurementOfSensor
 */
export async function getLatestMeasurementOfSensor(
	senseBoxId: string,
	sensorId: string,
	optional?: TOgetLatestMeasurementOfSensor
): Promise<IGetLatestMeasurement | string> {
	const r = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/sensors/${sensorId}`, { params: optional });

	return r.data;
}

export type TOgetLatestMeasurementOfSensor = {
	onlyValue?: boolean;
};

/**
 * @see https://docs.opensensemap.org/#api-Measurements-postNewMeasurements
 */
export async function postNewMeasurements(
	senseBoxId: string,
	data: TDataPostNewMeasurements,
	authorization?: string
): Promise<'Measurements saved in box'> {
	data.forEach((element) => {
		if (typeof element.value === 'number') {
			element.value = element.value.toString();
		}

		if (element.createdAt && element.createdAt instanceof Date) {
			element.createdAt = element.createdAt.toISOString();
		}
	});

	const r = await axios.post(`https://api.opensensemap.org/boxes/${senseBoxId}/data`, data, {
		headers: {
			Authorization: authorization
		}
	});

	return r.data;
}

export type TDataPostNewMeasurements = {
	sensor: string;
	value: string | number;
	createdAt?: TRFC3339Date | Date;
	location?: TLocation;
}[];

export interface IGetLatestMeasurement {
	_id: string;
	icon: string;
	sensorType: string;
	unit: string;
	title: string;
	lastMeasurement: {
		value: string;
		createdAt: TRFC3339Date;
	};
}
