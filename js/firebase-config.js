// Firebase Configuration
// Replace these values with your Firebase project configuration
// Get your config from: Firebase Console > Project Settings > General > Your apps

export const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

/*
SETUP INSTRUCTIONS:
==================

1. Create a Firebase Project:
   - Go to https://console.firebase.google.com/
   - Click "Add project" or select an existing project
   - Follow the setup wizard

2. Enable Firebase Storage:
   - In Firebase Console, go to "Storage" in the left sidebar
   - Click "Get started"
   - Start in test mode (you can change rules later)
   - Choose a storage location

3. Enable Firestore Database:
   - In Firebase Console, go to "Firestore Database" in the left sidebar
   - Click "Create database"
   - Start in test mode
   - Choose a location (same as Storage if possible)

4. Get Your Configuration:
   - Go to Project Settings (gear icon) > General
   - Scroll down to "Your apps"
   - If you don't have a web app, click "</>" to add one
   - Copy the config object values

5. Update Security Rules:
   
   For Storage (Storage > Rules):
   ==============================
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /audio/{fileName} {
         allow read: if true;
         allow write: if request.auth != null;  // Requires authentication
         // OR for public uploads (less secure):
         // allow write: if true;
       }
     }
   }
   
   For Firestore (Firestore > Rules):
   ===================================
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /audioFiles/{document} {
         allow read: if true;
         allow create: if request.auth != null;  // Requires authentication
         // OR for public writes (less secure):
         // allow create: if true;
       }
     }
   }

6. Enable Authentication (if using auth-based rules):
   - Go to "Authentication" in Firebase Console
   - Enable "Anonymous" or "Email/Password" sign-in method
   - Update the JavaScript to handle authentication

7. Replace the placeholder values in this file with your actual Firebase config

NOTE: For a public portfolio site, you may want to use public read/write rules,
but be aware this allows anyone to upload/delete files. Consider adding:
- File size limits
- Rate limiting
- File type validation (already implemented in the code)
- Moderation system

*/

