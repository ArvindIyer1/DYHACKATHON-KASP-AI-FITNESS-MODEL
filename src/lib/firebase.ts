// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "studio-3445753568-a7c77",
  "appId": "1:137312155103:web:10402e0818015e4cdc806a",
  "apiKey": "AIzaSyC-JrdLb4x5ayrTqaY3iM9XAhLTVg2skrE",
  "authDomain": "studio-3445753568-a7c77.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "137312155103"
};


// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence);


export { auth, app };
