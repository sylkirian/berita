import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';

import Alert from '../components/Alert';
import Button from '../components/Button';
import Container from '../components/Container';
import FormGroup from '../components/FormGroup';
import Image from '../components/Image';
import {apiGetData, apiSaveData, apiDeleteData} from '../helpers/api';

const ImageBox = styled(Image)`
	max-height: 503px;
	& > img {
		width: 100%;
	}
`

export default function NewsEditPage() {
	const [alert, setAlert] = useState();
	const [foto, setFoto] = useState();
	const [input, setInput] = useState({
		title: '',
		content: '',
		// photo: null
	});
	const [file, setFile] = useState();

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
				setFoto(resp.photo);
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

		if(file)
			formData.append('photo',file);

		apiSaveData(id, formData, (resp) => {
			console.log(resp);
			
			// redirect
			history.replace('/detail/' + resp.id);
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

			// redirect
			history.replace('/');
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
			<h1>{id ? 'Edit' : 'Buat'} Berita</h1>
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
					<ImageBox optional src={foto} />
					<input type="file" onChange={e => {
						// setInput({...input, file: e.target.files[0]}); // tidak bisa
						setFile(e.target.files[0]);
					}} />
				</FormGroup>
				<Button type="submit">Simpan</Button>
				<Button type="button" onClick={handleDelete}>Delete</Button>
			</form>
			<br /><br />
			<Link to="/">Kembali ke halaman utama</Link>
		</Container>
	);
}