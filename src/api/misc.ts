import axios from 'axios';

//
// https://docs.opensensemap.org/#api-Misc
//

// https://docs.opensensemap.org/#api-Misc-getStatistics
export async function getStatistics(optional?: {
	human?: boolean;
}): Promise<[number, number, number] | [string, string, string]> {
	const r = await axios.get('https://api.opensensemap.org/stats', {
		params: optional
	});

	return r.data;
}

// https://docs.opensensemap.org/#api-Misc-printRoutes
export async function printRoutes(): Promise<string> {
	const r = await axios.get('https://api.opensensemap.org/');

	return r.data;
}
