import { ArrowForward, ExitToApp } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import './App.css';
import AnalogueClock from './components/clock/AnalogueClock';
import Todo from './components/todo/index';
import { auth, provider } from './firebase';
import { autoAuth, initiateAuth, logOut } from './store/actions/auth';
import { connect } from 'react-redux';
import { loadTodos } from './store/actions/todo';
import { IconButton } from '@material-ui/core';

function App({ onLogin, user, onAutoLogin, onLogout, onLoadTodo }) {
	useEffect(() => {
		onAutoLogin();
		// onLoadTodo();
	}, [onAutoLogin]);

	return (
		<div className='app'>
			<div className='app__clock'>
				<AnalogueClock timeZone='Europe/Paris' size={120} />
			</div>
			<div className='app__main'>
				<Todo />
				{!user ? (
					<IconButton onClick={onLogin}>
						<ArrowForward />
					</IconButton>
				) : (
					<IconButton onClick={onLogout}>
						<ExitToApp />
					</IconButton>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
		token: state.auth.token,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLogin: () => dispatch(initiateAuth()),
		onAutoLogin: () => dispatch(autoAuth()),
		onLoadTodo: () => dispatch(loadTodos()),
		onLogout: () => dispatch(logOut()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
