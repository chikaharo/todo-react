import {
	ADD_TODO,
	ADD_TODO_START,
	DELETE_TODO,
	EDIT_TODO_START,
	LOAD_PAGE_CREATE,
	LOAD_TODO_START,
} from './actionTypes';

export const startAddTodo = (title, duration, createdBy) => {
	return {
		type: ADD_TODO,
		title,
		duration,
		createdBy,
	};
};

export const loadPageCreate = () => {
	return {
		type: LOAD_PAGE_CREATE,
	};
};

export const loadTodos = () => {
	return {
		type: LOAD_TODO_START,
	};
};

export const editTodo = ({ dId, updatedFields }) => {
	return {
		type: EDIT_TODO_START,
		dId,
		updatedFields,
	};
};

export const deleteTodo = dId => {
	return {
		type: DELETE_TODO,
		dId,
	};
};
