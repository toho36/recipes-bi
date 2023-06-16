import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBa5RtW_pZ74eDuVIdx_rn2A3TQfeAfMC8',
  authDomain: 'react-http-98ba6.firebaseapp.com',
  databaseURL:
    'https://react-http-98ba6-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-http-98ba6',
  storageBucket: 'react-http-98ba6.appspot.com',
  messagingSenderId: '918536500546',
  appId: '1:918536500546:web:107021d740515080ba84db',
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
