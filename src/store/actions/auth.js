import { AUTHENTICATE, AUTH_CHECK, INITIATE_AUTH, LOG_OUT_INIT } from './actionTypes';

export const initiateAuth = () => {
	return {
		type: INITIATE_AUTH,
	};
};

export const autoAuth = () => {
	return {
		type: AUTH_CHECK,
	};
};

export const logOut = () => {
	return {
		type: LOG_OUT_INIT,
	};
};
