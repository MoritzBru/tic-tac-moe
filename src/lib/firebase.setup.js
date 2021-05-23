import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from '../../firebase.config';

const app = firebase.initializeApp(firebaseConfig);
export default app;
