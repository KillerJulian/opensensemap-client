import axios from 'axios';

//
// https://docs.opensensemap.org/#api-Misc
//

/**
 * @see https://docs.opensensemap.org/#api-Misc-getStatistics
 */
export async function getStatistics(options?: GetStatisticsOptions): Promise<number[] | string[]> {
	const r = await axios.get('https://api.opensensemap.org/stats', {
		params: options
	});

	return r.data;
}

export type GetStatisticsOptions = {
	human?: boolean;
};

/**
 * @see https://docs.opensensemap.org/#api-Misc-printRoutes
 */
export async function printRoutes(): Promise<string> {
	const r = await axios.get('https://api.opensensemap.org/');

	return r.data;
}
