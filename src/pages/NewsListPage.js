import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import styled from 'styled-components';

import Clearfix, {Left, Right} from '../components/Clearfix';
import Container from '../components/Container';
import Image from '../components/Image';
import Timestamp from '../components/Timestamp';
import {apiGetData} from '../helpers/api';

const NewsRow = styled(Clearfix)`
	margin-bottom: 30px;
`

const ImageBox = styled.div`
	float: left;
	width: 33%;
`

const NewsImage = styled(Image)`
	height: 175px;
	overflow-y: hidden;
	& > img {
		width: 100%;
	}
`

const NewsBox = styled.div`
	float: right;
	min-height: 175px;
	position: relative;
	width: 63%;
`

const Title = styled.h2`
	margin-top: 0;
`

const TitleLink = styled(Link)`
	color: black;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`

const Content = styled.p`
	margin: 0 0 15px 0;
	max-height: 79px;
	overflow-y: hidden;
	text-align: justify;
`

export default function NewsListPage({login}) {
	const [data, setData] = useState();

	const history = useHistory();

	useEffect(() => {
		apiGetData(null, (resp) => {
			console.log(resp);
			setData(resp);
		}, (error) => {
			console.error(error);
		});
	}, [history]);

	function NewsList({login, data}) {
		return (
			<NewsRow>
				<ImageBox>
					<Link to={'/detail/' + data.id}>
						<NewsImage src={data.photo} />
					</Link>
				</ImageBox>
				<NewsBox>
					<Title>
						<TitleLink to={'/detail/' + data.id}>
							{data.title}
						</TitleLink>
					</Title>
					<Content>{data.content}</Content>
					<Clearfix style={{bottom: 0, position: 'absolute'}}>
						<Left>
							<Timestamp data={data} />
						</Left>
						{login && (
						<Right>
							<Link to={'/edit/' + data.id}>Edit</Link>
						</Right>
						)}
					</Clearfix>
				</NewsBox>
			</NewsRow>
		);
	}

	if(data) {
		return (
			<Container>
				{data.map((value, index) => (
				<NewsList key={index} login={login} data={value} />
				))}
			</Container>
		);
	}
	else
		return null;
}