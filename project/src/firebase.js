// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCpqnHOsgnd4e8fOQ7CeQgaNSJwJBFD2ak',
  authDomain:'solution-challenge-tohome.firebaseapp.com',
  projectId: 'solution-challenge-tohome',
  storageBucket: 'solution-challenge-tohome.appspot.com',
  messagingSenderId: '99147907230',
  appId: '1:99147907230:web:afdc0f3c6d386eec917b8f'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
