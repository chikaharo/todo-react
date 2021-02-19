import { AUTHENTICATE, INITIATE_AUTH, LOG_OUT } from '../actions/actionTypes';

const initialState = {
	user: null,
	token: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case INITIATE_AUTH:
			return initialState;
		case AUTHENTICATE:
			return {
				user: action.payload.user,
				token: action.payload.token,
			};
		case LOG_OUT:
			return initialState;
	}
	return state;
};
