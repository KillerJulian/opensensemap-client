import axios from 'axios';

//
// https://docs.opensensemap.org/#api-Misc
//

/**
 * @see https://docs.opensensemap.org/#api-Misc-getStatistics
 */
export async function getStatistics(
	optional?: TOgetStatistics
): Promise<[number, number, number] | [string, string, string]> {
	const r = await axios.get('https://api.opensensemap.org/stats', {
		params: optional
	});

	return r.data;
}

export type TOgetStatistics = {
	human?: boolean;
};

/**
 * @see https://docs.opensensemap.org/#api-Misc-printRoutes
 */
export async function printRoutes(): Promise<string> {
	const r = await axios.get('https://api.opensensemap.org/');

	return r.data;
}
