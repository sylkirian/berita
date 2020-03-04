import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import Container from './components/Container';
import Clearfix, {Left, Right} from './components/Clearfix';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NewsListPage from './pages/NewsListPage';
import NewsDetailPage from './pages/NewsDetailPage';
import NewsEditPage from './pages/NewsEditPage';
import NotFound from './pages/NotFound';

const Header = styled.div`
	margin-bottom: 30px;
	width: 100%;
`

const Title = styled.div`
	font-size: 36px;
	padding: 10px;
	text-align: center;
`

const Menu = styled.div`
	background-color: black;
	color: white;
	& ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	& li {
		float: left;
	}
	& a {
		color: white;
		padding: 10px;
	}
`

function App() {
	let token = localStorage.getItem('login');
	if(token)
		token = JSON.parse(token).token;

	const [login, setLogin] = useState(localStorage.getItem('login'));

	useEffect(() => {
		document.body.title = 'Portal Berita';
		document.body.style.fontFamily = 'Roboto, Helvetica, Arial, sans-serif';
		document.body.style.margin = 0;
	}, []);

	return (
		<Router>
			<Header>
				<Title>
					Portal Berita
				</Title>
				<Menu>
					<Container>
						<Clearfix style={{padding:'10px 0'}}>
							<Left>
								<ul>
									{login ? [(
									<li key="edit">
										<Link to="/edit">Buat Berita</Link>
									</li>
									), (
									<li key="logout">
										<Link to="/logout">Logout</Link>
									</li>
									)] : (
									<li>
										<Link to="/login">Login</Link>
									</li>
									)}
								</ul>
							</Left>
							{login && (
							<Right>
								{login.username}
							</Right>
							)}
						</Clearfix>
					</Container>
				</Menu>
			</Header>
			<Switch>
				<Route exact path="/">
					<NewsListPage login={login} />
				</Route>
				<Route path="/detail/:id">
					<NewsDetailPage />
				</Route>
				{login ? [(
				<Route key="logout" path="/logout">
					<Logout setLogin={setLogin} />
				</Route>
				), (
				<Route key="edit" path="/edit/:id?">
					<NewsEditPage />
				</Route>
				)] : (
				<Route path="/login">
					<Login setLogin={setLogin} />
				</Route>
				)}
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</Router>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));