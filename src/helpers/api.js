const axios = require('axios');
const api = axios.create({
	// baseURL: 'http://learn.hackatown.online/api/'
	baseURL: 'http://localhost/demo/api/'
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

export async function apiSaveData(id, callback, callbackError) {
	try {
		let response = await api.post('news' + (id ? '/' + id : ''));

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

		let response = await api.delete('news/' + id);

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

export default api;