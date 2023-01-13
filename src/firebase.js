// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBvjMdf6SeevvKEcL9QA4tGzOmLywXDNhE',
  authDomain: 'zenda-wiki.firebaseapp.com',
  projectId: 'zenda-wiki',
  storageBucket: 'zenda-wiki.appspot.com',
  messagingSenderId: '171885655496',
  appId: '1:171885655496:web:b82152c4f50ea0f4ccbcfd',
  measurementId: 'G-THWHNZC2SN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

export default app;
