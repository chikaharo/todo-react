import { put, select } from 'redux-saga/effects';
import { db } from '../../firebase';
import {
	ADD_TODO_FAILED,
	ADD_TODO_SUCCESS,
	DELETE_TODO_FAILED,
	DELETE_TODO_SUCCESS,
	EDIT_TODO_FAILED,
	EDIT_TODO_SUCCESS,
	LOAD_TODO_START,
	LOAD_TODO_SUCCESS,
} from '../actions/actionTypes';
import firebase from 'firebase';

export function* loadTodo() {
	const { auth } = yield select();
	console.log(auth);
	const todoArr = [];
	yield db
		.collection('todos')
		.where('createdBy', '==', auth.user.uid)
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				todoArr.push({ dId: doc.id, ...doc.data() });
			});
		});
	yield put({
		type: LOAD_TODO_SUCCESS,
		payload: todoArr,
	});
}

export function* addTodo(action) {
	try {
		const res = yield db.collection('todos').add({
			id: Math.random().toString(),
			title: action.title,
			duration: action.duration,
			remaining: action.duration,
			createdBy: action.createdBy,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		});
		const doc = yield res.get();
		const data = doc.data();
		console.log(res.id, ' ADD DATA ', data);
		yield put({
			type: ADD_TODO_SUCCESS,
			payload: data,
		});
	} catch (e) {
		yield console.log('ERR', e);
		yield put({ type: ADD_TODO_FAILED });
	}
}

export function* editTodo(action) {
	try {
		console.log('EDIT ACTIOn', action);
		const updateEl = yield db.collection('todos').doc(action.dId);
		yield updateEl.update({
			...action.updatedFields,
		});
		const payload = yield updateEl.onSnapshot(doc => {
			console.log('RETURN', { dId: doc.id, ...doc.data() });
		});
		// console.log(payload);
		yield put({
			type: EDIT_TODO_SUCCESS,
			payload,
		});
	} catch (err) {
		console.log('UPDATE ERROR', err);
		yield put({
			type: EDIT_TODO_FAILED,
			payload: err,
		});
	}
}

export function* deleteTodo(action) {
	try {
		yield db.collection('todos').doc(action.dId).delete();
		yield put({
			type: DELETE_TODO_SUCCESS,
			payload: {
				dId: action.dId,
			},
		});
	} catch (err) {
		yield put({
			type: DELETE_TODO_FAILED,
			payload: err,
		});
	}
}
