import axios from 'axios';
import { TColumns, TExposure, TOperation, TRFC3339Date } from './types';

//
// https://docs.opensensemap.org/#api-Statistics
//

/**
 * @see https://docs.opensensemap.org/#api-Statistics-descriptive
 */
export async function descriptive(
	boxId: string | undefined,
	bbox: string | undefined,
	phenomenon: string,
	fromDate: TRFC3339Date | Date,
	toDate: TRFC3339Date | Date,
	operation: TOperation,
	window: string,
	optional?: TOdescriptive
): Promise<Record<string, string | number>[]> {
	if (fromDate instanceof Date) {
		fromDate = fromDate.toISOString();
	}

	if (toDate instanceof Date) {
		toDate = toDate.toISOString();
	}

	if (optional?.columns && Array.isArray(optional.columns)) {
		optional.columns = optional.columns.join();
	}

	if (optional?.exposure && Array.isArray(optional.exposure)) {
		optional.exposure = optional.exposure.join();
	}

	const r = await axios.get(
		'https://api.opensensemap.org/statistics/descriptive',
		{
			params: Object.assign(
				{
					boxId,
					bbox,
					phenomenon,
					'from-date': fromDate,
					'to-date': toDate,
					operation,
					window,
					format: 'json'
				},
				optional
			)
		}
	);

	return r.data;
}

export type TOdescriptive = {
	columns?: string | TColumns[];
	exposure?: string | TExposure[];
};
