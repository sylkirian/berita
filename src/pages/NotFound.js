import React from 'react';
import {Link} from 'react-router-dom';
import Container from '../components/Container';

export default function NotFound() {
	return (
		<Container>
			<h1>Halaman Tidak Ditemukan</h1>
			<Link to="/">Kembali ke halaman utama</Link>
		</Container>
	);
}