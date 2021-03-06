const axios = require('axios');

const api = axios.create({
	// baseURL: 'http://learn.hackatown.online/api/'
	baseURL: 'http://192.168.1.33:8000/api/'
});

export async function apiLogin(input, callback, callbackError) {
	try {
		let response = await api.post('login', input);

		response = response.data;

		// ada error
		if(response.error)
			throw new Error(response.message);

		// panggil callback
		if(callback)
			callback(response);
	}
	catch(error) {
		// panggil callback error
		if(callbackError)
			callbackError(error);
	}
}

export async function apiGetData(id, callback, callbackError) {
	try {
		let response = await api.get('news' + (id ? '/' + id : ''));

		response = response.data;

		// ada error
		if(response.error)
			throw new Error(response.error);

		// panggil callback
		if(callback)
			callback(response.data);
	}
	catch(error) {
		// panggil callback error
		if(callbackError)
			callbackError(error);
	}
}

export async function apiSaveData(id, formdata, callback, callbackError) {
	try {
		const token = getToken();

		if(!token)
			throw new Error('Anda belum login');

		let response = await api.post('news' + (id ? '/' + id : ''), formdata, {
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'multipart/form-data'
			}
		});

		response = response.data;

		// ada error
		if(response.error)
			throw new Error(response.message);

		// panggil callback
		if(callback)
			callback(response.data);
	}
	catch(error) {
		// panggil callback error
		if(callbackError)
			callbackError(error);
	}
}

export async function apiDeleteData(id, callback, callbackError) {
	try {
		if(!id)
			throw new Error('Pilih data yang akan dihapus');

		const token = getToken();

		if(!token)
			throw new Error('Anda belum login');

		let response = await api.delete('news/' + id, {
			headers: {
				'Authorization': 'Bearer ' + token
			}
		});

		response = response.data;

		// ada error
		if(response.error)
			throw new Error(response.message);

		// panggil callback
		if(callback)
			callback(response.data);
	}
	catch(error) {
		// panggil callback error
		if(callbackError)
			callbackError(error);
	}
}

function getToken() {
	const logindata = localStorage.getItem('login');

	if(logindata)
		return JSON.parse(logindata).token;
	else
		return null;
}

export default api;