import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import Alert from '../components/Alert';
import Button from '../components/Button';
import Container from '../components/Container';
import FormGroup from '../components/FormGroup';
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
			localStorage.setItem('login', JSON.stringify(login));

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
				<FormGroup>
					<label>Username</label>
					<input type="text" name="username" value={input.username} placeholder="Username" onChange={handleChange} />
				</FormGroup>
				<FormGroup>
					<label>Password</label>
					<input type="password" name="password" value={input.password} placeholder="Password" onChange={handleChange} />
				</FormGroup>
				<Button type="submit">Login</Button>
			</form>
			<br /><br />
			<Link to="/">Kembali ke halaman utama</Link>
		</Container>
	);
}