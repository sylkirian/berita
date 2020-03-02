import React from 'react';
import {Redirect} from 'react-router-dom';

export default function Logout({setLogin}) {
	localStorage.removeItem('login');

	setLogin(null);

	return (
		<Redirect to="/" />
	);
}