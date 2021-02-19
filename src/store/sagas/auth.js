import { auth, provider } from '../../firebase';
import { put } from 'redux-saga/effects';
import { AUTHENTICATE, LOG_OUT } from '../actions/actionTypes';

// const loginWithGoogle = () => {
// 	auth.signInWithPopup(provider).then(result => {
// 		console.log('GOOGLE LOGIN', result);
// 		setUser(result.user);
// 	});
// };

export function* authenticate() {
	const result = yield auth.signInWithPopup(provider);
	yield localStorage.setItem('token', JSON.stringify(result.credential.accessToken));
	yield localStorage.setItem('user', JSON.stringify(result.user));
	yield put({
		type: AUTHENTICATE,
		payload: {
			user: result.user,
			token: result.credential.accessToken,
		},
	});
}

export function* logout() {
	yield auth.signOut();
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('user');
	yield put({
		type: LOG_OUT,
	});
}

export function* authCheck() {
	const token = yield JSON.parse(localStorage.getItem('token'));
	if (!token) {
		yield put({
			type: LOG_OUT,
		});
	} else {
		const user = yield JSON.parse(localStorage.getItem('user'));
		console.log(`TOKEN: ${token}, USER: ${user}`);
		yield put({
			type: AUTHENTICATE,
			payload: {
				user,
				token,
			},
		});
	}
}
