import {
	ADD_TODO_FAILED,
	ADD_TODO_START,
	ADD_TODO_SUCCESS,
	DELETE_TODO_SUCCESS,
	DELETE_TODO_FAILED,
	EDIT_TODO_FAILED,
	EDIT_TODO_START,
	EDIT_TODO_SUCCESS,
	LOAD_PAGE_CREATE,
	LOAD_TODO_START,
	LOAD_TODO_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
	todos: [],
	loading: false,
	error: null,
	isSuccess: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TODO_START:
			return { ...state, loading: true, error: null };
		case LOAD_TODO_SUCCESS:
			return { ...state, todos: action.payload, loading: false, error: null };
		case LOAD_PAGE_CREATE:
			return { ...state, isSuccess: false };
		case ADD_TODO_START:
			return { ...state, loading: true, error: null };
		case ADD_TODO_SUCCESS:
			return {
				...state,
				isSuccess: true,
				loading: false,
				error: null,
				todos: [action.payload, ...state.todos],
			};
		case ADD_TODO_FAILED:
			return { ...state, loading: false, error: action.payload, isSuccess: false };
		case EDIT_TODO_START:
			return { ...state, loading: true, error: null, isSuccess: false };
		case EDIT_TODO_SUCCESS:
			const editIdx = state.todos.findIndex(t => t.dId === action.payload.dId);
			const editedTodos = [...state.todos];
			editedTodos[editIdx] = action.payload;
			return { ...state, loading: false, error: null, isSuccess: true, todos: editedTodos };
		case EDIT_TODO_FAILED:
			return { ...state, loading: false, error: action.payload, isSuccess: false };
		case DELETE_TODO_SUCCESS:
			return { ...state, todos: state.todos.filter(t => t.dId !== action.payload.dId) };
		case DELETE_TODO_FAILED:
			return { ...state, error: action.payload };
	}
	return state;
};

export default reducer;
