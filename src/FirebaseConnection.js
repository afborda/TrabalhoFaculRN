import firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyAA2rB-L7ki4tqL3O0bkicokovgn20egEw',
  authDomain: 'projeto-teste-45fc1.firebaseapp.com',
  databaseURL: 'https://projeto-teste-45fc1.firebaseio.com',
  projectId: 'projeto-teste-45fc1',
  storageBucket: 'projeto-teste-45fc1.appspot.com',
  messagingSenderId: '51668802229',
  appId: '1:51668802229:web:7db1baa327192b2445fcfc',
  measurementId: 'G-RY3KVS39T5',
};

firebase.initializeApp(config);

export default firebase;
