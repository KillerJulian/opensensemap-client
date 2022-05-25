import axios from 'axios';
import { AdvancedColumns, Exposure, Location, RFC3339Date } from './types';

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
	options?: PostNewMeasurementOptions
): Promise<'Measurement saved in box'> {
	if (options?.createdAt && options.createdAt instanceof Date) {
		options.createdAt = options.createdAt.toISOString();
	}

	const r = await axios.post(
		`https://api.opensensemap.org/boxes/${senseBoxId}/${sensorId}`,
		Object.assign(
			{
				value: typeof value === 'string' ? value : value.toString()
			},
			options
		),
		{
			headers: authorization ? { Authorization: authorization } : {}
		}
	);

	return r.data;
}

export type PostNewMeasurementOptions = {
	createdAt?: RFC3339Date | Date;
	location?: Location;
};

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getData
 */
export async function getData(
	senseBoxId: string,
	sensorId: string,
	options?: GetDataOptions
): Promise<
	{
		value: string;
		location: Location;
		createdAt: RFC3339Date;
	}[]
> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	const r = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/data/${sensorId}`, {
		params: Object.assign({ format: 'json' }, options)
	});

	return r.data;
}

export type GetDataOptions = {
	'from-date'?: RFC3339Date | Date;
	'to-date'?: RFC3339Date | Date;
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
	options?: DeleteMeasurementsOptions
): Promise<{ code: 'Ok'; message: string }> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	if (options && Array.isArray(options.timestamps)) {
		options.timestamps = options.timestamps.map((element) => {
			if (element instanceof Date) {
				return element.toISOString();
			}

			return element;
		});
	}

	const r = await axios.delete(`https://api.opensensemap.org/boxes/${senseBoxId}/${sensorId}/measurements`, {
		headers: {
			Authorization: `Bearer ${authorization}`
		},
		data: options
	});

	return r.data;
}

export type DeleteMeasurementsOptions = {
	'from-date'?: RFC3339Date | Date;
	'to-date'?: RFC3339Date | Date;
	timestamps?: Array<RFC3339Date | Date>;
	deleteAllMeasurements?: boolean;
};

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getDataMulti
 */
export async function getDataMulti(
	boxId: string[] | undefined,
	bbox: string | undefined,
	phenomenon: string,
	options?: GetDataMultiOptions
): Promise<
	{
		createdAt: RFC3339Date;
		value: string;
		sensorId: string;
		lat: number;
		lon: number;
	}[]
> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	if (options?.columns && Array.isArray(options.columns)) {
		options.columns = options.columns.join();
	}

	if (options?.exposure && Array.isArray(options.exposure)) {
		options.exposure = options.exposure.join();
	}

	const r = await axios.get('https://api.opensensemap.org/boxes/data', {
		params: Object.assign(
			{
				format: 'json',
				boxId: boxId?.join(),
				bbox,
				phenomenon
			},
			options
		)
	});

	return r.data;
}

export type GetDataMultiOptions = {
	'from-date'?: RFC3339Date | Date;
	'to-date'?: RFC3339Date | Date;
	columns?: string | AdvancedColumns[];
	exposure?: string | Exposure[];
};

/**
 * @see https://docs.opensensemap.org/#api-Measurements-getLatestMeasurements
 */
export async function getLatestMeasurements(senseBoxId: string): Promise<{
	_id: string;
	sensors: GetLatestMeasurement[];
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
	options?: GetLatestMeasurementOfSensorOptions
): Promise<GetLatestMeasurement | string> {
	const r = await axios.get(`https://api.opensensemap.org/boxes/${senseBoxId}/sensors/${sensorId}`, { params: options });

	return r.data;
}

export type GetLatestMeasurementOfSensorOptions = {
	onlyValue?: boolean;
};

/**
 * @see https://docs.opensensemap.org/#api-Measurements-postNewMeasurements
 */
export async function postNewMeasurements(
	senseBoxId: string,
	data: PostNewMeasurementsData,
	authorization?: string
): Promise<'Measurements saved in box'> {
	data = data.map((element) => {
		if (typeof element.value === 'number') {
			element.value = element.value.toString();
		}

		if (element.createdAt && element.createdAt instanceof Date) {
			element.createdAt = element.createdAt.toISOString();
		}

		return element;
	});

	const r = await axios.post(`https://api.opensensemap.org/boxes/${senseBoxId}/data`, data, {
		headers: authorization ? { Authorization: authorization } : {}
	});

	return r.data;
}

export type PostNewMeasurementsData = {
	sensor: string;
	value: string | number;
	createdAt?: RFC3339Date | Date;
	location?: Location;
}[];

export interface GetLatestMeasurement {
	_id: string;
	icon: string;
	sensorType: string;
	unit: string;
	title: string;
	lastMeasurement: {
		value: string;
		createdAt: RFC3339Date;
	};
}
