import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';

import Alert from '../components/Alert';
import Button from '../components/Button';
import Container from '../components/Container';
import FormGroup from '../components/FormGroup';
import Image from '../components/Image';
import {apiGetData, apiSaveData, apiDeleteData} from '../helpers/api';

const ImageBox = styled.div`
	max-height: 503px;
	overflow-y: hidden;
	& > img {
		width: 100%;
	}
`

export default function NewsEditPage() {
	const [alert, setAlert] = useState();
	const [input, setInput] = useState({
		title: '',
		content: '',
		photo: null,
		file: null
	});

	const {id} = useParams();
	const history = useHistory();

	useEffect(() => {
		if(id) {
			apiGetData(id, (resp) => {
				console.log(resp);
				setInput({
					title: resp.title,
					content: resp.content,
					photo: resp.photo
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

		const formData = new FormData();

		Object.keys(input).forEach(function(key) {
			formData.append(key,input[key]);
		});

		apiSaveData(id, formData, (resp) => {
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
				<FormGroup>
					<label>Judul Berita</label>
					<input type="text" name="title" value={input.title} placeholder="Judul Berita" onChange={handleChange} />
				</FormGroup>
				<FormGroup>
					<label>Isi Berita</label>
					<textarea name="content" rows="25" value={input.content} placeholder="Isi Berita" onChange={handleChange} />
				</FormGroup>
				<FormGroup>
					<label>Gambar</label>
					<Image optional src={input.photo} onChange={e => {
						setInput({file: e.target.files[0], ...input}); // ambil satu saja
					}} />
					<input type="file" />
				</FormGroup>
				<Button type="submit">Simpan</Button>
				<Button type="button" onClick={handleDelete}>Delete</Button>
			</form>
			<br /><br />
			<Link to="/">Kembali ke halaman utama</Link>
		</Container>
	);
}