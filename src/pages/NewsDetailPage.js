import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';

import Container from '../components/Container';
import Image from '../components/Image';
import Timestamp from '../components/Timestamp';
import {apiGetData} from '../helpers/api';

const ImageBox = styled.div`
	max-height: 503px;
	overflow-y: hidden;
	& > img {
		margin-top: 15px;
		width: 100%;
	}
`

const Content = styled.p`
	text-align: justify;
`

export default function NewsDetailPage() {
	const [data, setData] = useState();

	const {id} = useParams();
	const history = useHistory();

	useEffect(() => {
		apiGetData(id, (resp) => {
			console.log(resp);
			setData(resp);
		}, (error) => {
			console.error(error);
			history.replace('/notfound');
		});
	}, [id, history]);

	if(data) {
		return (
			<Container>
				<h2>{data.title}</h2>
				<Timestamp data={data} />
				<ImageBox>
					<Image optional src={data.photo} />
				</ImageBox>
				<Content>
					{data.content}
				</Content>
				<Link to="/">
					Kembali ke halaman utama
				</Link>
			</Container>
		);
	}
	else
		return null;
}