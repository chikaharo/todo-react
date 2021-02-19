import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBufKRdRCoHmVeN_XzRKGds-dR8el07FkI',
	authDomain: 'todo-react-e1896.firebaseapp.com',
	projectId: 'todo-react-e1896',
	storageBucket: 'todo-react-e1896.appspot.com',
	messagingSenderId: '474317760069',
	appId: '1:474317760069:web:22b0fb1f1872d88f05e52c',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const db = firebaseApp.firestore();
export const storage = firebase.storage();
