import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import Alert from '../components/Alert';
import Container from '../components/Container';
import FormItem from '../components/FormItem';
import {apiLogin} from '../helpers/api';

export default function Login({setLogin}) {
	const [alert, setAlert] = useState();

	// default dulu untuk coba-coba :D
	const [input, setInput] = useState({
		username: 'danang',
		password: 'd2345g'
	});

	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		apiLogin(input, (resp) => {
			console.log(resp);
			const login = {
				id: resp.data.id,
				username: resp.data.username,
				token: resp.meta.token
			};

			setLogin(login);

			// simpan juga ke local storage
			localStorage.setItem('login', login);

			// redirect
			history.replace('/');
		}, (error) => {
			console.error(error);
			setAlert({
				error: true,
				message: error
			});
		});
	}

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	}

	return (
		<Container>
			<h1>Login</h1>
			{alert && (
				<Alert error>{alert.message}</Alert>
			)}
			<form onSubmit={handleSubmit}>
				<FormItem>
					<label>Username</label>
					<div><input type="text" name="username" value={input.username} placeholder="Username" onChange={handleChange} /></div>
				</FormItem>
				<FormItem>
					<label>Password</label>
					<div><input type="password" name="password" value={input.password} placeholder="Password" onChange={handleChange} /></div>
				</FormItem>
				<button type="submit">Login</button>
			</form>
			<br /><br />
			<Link to="/">Kembali ke halaman utama</Link>
		</Container>
	);
}