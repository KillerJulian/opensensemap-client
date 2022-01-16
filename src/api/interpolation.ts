import axios from 'axios';
import { Exposure, RFC3339Date } from './types';

//
// https://docs.opensensemap.org/#api-Interpolation
//

/**
 * @see https://docs.opensensemap.org/#api-Interpolation-calculateIdw
 */
export async function calculateIdw(
	phenomenon: string,
	bbox: string,
	options?: CalculateIdwOptions
): Promise<{ code: 'NotFound'; message: 'no measurements found' } | CalculateIdw> {
	if (options?.['from-date'] && options['from-date'] instanceof Date) {
		options['from-date'] = options['from-date'].toISOString();
	}

	if (options?.['to-date'] && options['to-date'] instanceof Date) {
		options['to-date'] = options['to-date'].toISOString();
	}

	if (options?.exposure && Array.isArray(options.exposure)) {
		options.exposure = options.exposure.join();
	}

	const r = await axios.get('https://api.opensensemap.org/statistics/idw', {
		params: Object.assign({ phenomenon, bbox }, options)
	});

	return r.data;
}

export type CalculateIdwOptions = {
	'from-date'?: RFC3339Date | Date;
	'to-date'?: RFC3339Date | Date;
	gridType?: 'hex' | 'square' | 'triangle';
	cellWidth?: number;
	power?: number;
	numTimeSteps?: number;
	numClasses?: number;
	exposure?: string | Exposure[];
};

export interface CalculateIdw {
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
		timesteps: RFC3339Date[];
	};
}
