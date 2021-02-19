import { takeEvery } from 'redux-saga/effects';
import {
	ADD_TODO,
	ADD_TODO_START,
	AUTH_CHECK,
	DELETE_TODO,
	EDIT_TODO_START,
	INITIATE_AUTH,
	LOAD_TODO_START,
	LOG_OUT_INIT,
} from '../actions/actionTypes';
import { authCheck, authenticate, logout } from './auth';
import { addTodo, deleteTodo, editTodo, loadTodo } from './todo';

export function* watchAuth() {
	yield takeEvery(INITIATE_AUTH, authenticate);
	yield takeEvery(AUTH_CHECK, authCheck);
	yield takeEvery(LOG_OUT_INIT, logout);
}

export function* watchTodo() {
	yield takeEvery(ADD_TODO, addTodo);
	yield takeEvery(LOAD_TODO_START, loadTodo);
	yield takeEvery(EDIT_TODO_START, editTodo);
	yield takeEvery(DELETE_TODO, deleteTodo);
}
