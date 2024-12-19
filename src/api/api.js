export const request = async (url, option = {}) => {
	try {
		const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents${url}`, {
			...option,
			headers: {
				'x-username': `codingiscold`,
				'Content-Type': 'application/json',
			},
		});
		if (response.ok) {
			const json = await response.json();
			return json;
		}
		throw new Error(`Api Error, ${response}`);
	} catch (e) {
		console.log('통신 문제', e);
	}
};
