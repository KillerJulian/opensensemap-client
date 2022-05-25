import axios from 'axios';
import { Columns, Exposure, Operation, RFC3339Date } from './types';

//
// https://docs.opensensemap.org/#api-Statistics
//

/**
 * @see https://docs.opensensemap.org/#api-Statistics-descriptive
 */
export async function descriptive(
	boxId: string[],
	bbox: string | undefined,
	phenomenon: string,
	fromDate: RFC3339Date | Date,
	toDate: RFC3339Date | Date,
	operation: Operation,
	window: string,
	options?: DescriptiveOptions
): Promise<Record<string, string | number>[]> {
	if (fromDate instanceof Date) {
		fromDate = fromDate.toISOString();
	}

	if (toDate instanceof Date) {
		toDate = toDate.toISOString();
	}

	if (options?.columns && Array.isArray(options.columns)) {
		options.columns = options.columns.join();
	}

	if (options?.exposure && Array.isArray(options.exposure)) {
		options.exposure = options.exposure.join();
	}

	const r = await axios.get('https://api.opensensemap.org/statistics/descriptive', {
		params: Object.assign(
			{
				boxId: boxId.join(),
				bbox,
				phenomenon,
				'from-date': fromDate,
				'to-date': toDate,
				operation,
				window,
				format: 'json'
			},
			options
		)
	});

	return r.data;
}

export type DescriptiveOptions = {
	columns?: string | Columns[];
	exposure?: string | Exposure[];
};
