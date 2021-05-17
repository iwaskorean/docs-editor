import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBIoWsyg-tsZCQgmTv6DD_gySBNLWITe1s',
  authDomain: 'evernote-clone-26968.firebaseapp.com',
  projectId: 'evernote-clone-26968',
  storageBucket: 'evernote-clone-26968.appspot.com',
  messagingSenderId: '1097424883205',
  appId: '1:1097424883205:web:be055e55e9b9d32114566c',
  measurementId: 'G-51W5RJ0GMT',
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
