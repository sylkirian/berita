import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';

import Alert from '../components/Alert';
import Container from '../components/Container';
import FormItem from '../components/FormItem';
import {apiGetData, apiSaveData, apiDeleteData} from '../helpers/api';

export default function NewsEditPage() {
	const [alert, setAlert] = useState();
	const [input, setInput] = useState({
		title: '',
		content: ''
	});

	const {id} = useParams();
	const history = useHistory();

	useEffect(() => {
		if(id) {
			apiGetData(id, (resp) => {
				console.log(resp);
				setInput({
					title: resp.title,
					content: resp.content
				});
			}, (error) => {
				console.error(error);
				history.replace('/notfound');
			});
		}
	}, [id, history]);

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	}

	function handleSubmit(e) {
		e.preventDefault();

		apiSaveData(id, (resp) => {
			console.log(resp);
			setAlert({
				error: false,
				message: 'Penyimpanan data berhasil'
			});
		}, (error) => {
			console.error(error);
			setAlert({
				error: true,
				message: 'Penyimpanan data gagal'
			});
		});
	}

	function handleDelete() {
		apiDeleteData(id, (resp) => {
			console.log(resp);
			setAlert({
				error: false,
				message: 'Hapus berita berhasil'
			});
		}, (error) => {
			console.error(error);
			setAlert({
				error: true,
				message: 'Hapus berita gagal'
			});
		});
	}

	return (
		<Container>
			<h1>Edit Berita</h1>
			{alert && (
				<Alert error={alert.error}>{alert.message}</Alert>
			)}
			<form onSubmit={handleSubmit}>
				<FormItem>
					<label>Judul Berita</label>
					<div><input type="text" name="title" value={input.title} placeholder="Judul Berita" onChange={handleChange} /></div>
				</FormItem>
				<FormItem>
					<label>Isi Berita</label>
					<div><textarea name="content" value={input.content} placeholder="Isi Berita" onChange={handleChange} /></div>
				</FormItem>
				<button type="submit">Simpan</button>
				<button type="button" onClick={handleDelete}>Delete</button>
			</form>
			<br /><br />
			<Link to="/">Kembali ke halaman utama</Link>
		</Container>
	);
}