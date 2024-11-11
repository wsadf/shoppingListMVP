import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDOPQByclYTMu7x_bFXPklt7pqeogoauAk",
    authDomain: "shopping-list-1e1a0.firebaseapp.com",
    projectId: "shopping-list-1e1a0",
    storageBucket: "shopping-list-1e1a0.firebasestorage.app",
    messagingSenderId: "501118699718",
    appId: "1:501118699718:web:4b20f9331822849212efc7"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);

  