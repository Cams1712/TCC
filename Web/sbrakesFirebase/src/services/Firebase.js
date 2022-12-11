import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = initializeApp({
  apiKey: 'AIzaSyDqAyRPjT8DnnOktXVuJKNuO908PubxA-c',
  authDomain: 'sbrakes-a01f3.firebaseapp.com',
  projectId: 'sbrakes-a01f3',
  storageBucket: 'sbrakes-a01f3.appspot.com',
  messagingSenderId: '396203126346',
  appId: '1:396203126346:web:0b1fd5d6c9beb7baefc0b3',
  measurementId: 'G-DECF4XTR2B',
});

export const db = getFirestore(firebaseConfig);
