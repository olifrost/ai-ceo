import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAtq3wBMOYjnmCKYv9Z9sIoc0GeGFJ-hfk",
  authDomain: "ai-ceo-1438a.firebaseapp.com",
  projectId: "ai-ceo-1438a",
  storageBucket: "ai-ceo-1438a.firebasestorage.app",
  messagingSenderId: "479261192566",
  appId: "1:479261192566:web:0c130998535d3f1f464a57",
  measurementId: "G-8ECZFVH7N4"
};
// Firebase Security Rules for Firestore:
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /ceos/{document} {
//       allow read: if true;
//       allow write: if request.auth == null || request.auth.uid != null;
//     }
//   }
// }

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
