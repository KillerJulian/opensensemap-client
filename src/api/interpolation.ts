import axios from 'axios';
import { TExposure, TRFC3339Date } from './types';

//
// https://docs.opensensemap.org/#api-Interpolation
//

/**
 * @see https://docs.opensensemap.org/#api-Interpolation-calculateIdw
 */
export async function calculateIdw(
	phenomenon: string,
	bbox: string,
	optional?: TOcalculateIdw
): Promise<{ code: 'NotFound'; message: 'no measurements found' } | ICalculateIdw> {
	if (optional?.['from-date'] && optional['from-date'] instanceof Date) {
		optional['from-date'] = optional['from-date'].toISOString();
	}

	if (optional?.['to-date'] && optional['to-date'] instanceof Date) {
		optional['to-date'] = optional['to-date'].toISOString();
	}

	if (optional?.exposure && Array.isArray(optional.exposure)) {
		optional.exposure = optional.exposure.join();
	}

	const r = await axios.get('https://api.opensensemap.org/statistics/idw', {
		params: Object.assign({ phenomenon, bbox }, optional)
	});

	return r.data;
}

export type TOcalculateIdw = {
	'from-date'?: TRFC3339Date | Date;
	'to-date'?: TRFC3339Date | Date;
	gridType?: 'hex' | 'square' | 'triangle';
	cellWidth?: number;
	power?: number;
	numTimeSteps?: number;
	numClasses?: number;
	exposure?: string | TExposure[];
};

export interface ICalculateIdw {
	code: 'Ok';
	data: {
		breaks: number[];
		featureCollection: {
			type: string;
			features: {
				type: string;
				properties: {
					idwValues: number[];
				};
				geometry: {
					type: string;
					coordinates: number[][][];
				};
			};
		}[];
		timesteps: TRFC3339Date[];
	};
}
