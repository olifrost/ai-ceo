# Firebase Setup Instructions

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard

## 2. Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll set proper rules later)
4. Select a location close to your users

## 3. Get Your Web App Config

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" and select Web (</>) icon
4. Register your app with a nickname
5. Copy the config object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 4. Update the Config

Replace the placeholder values in `src/firebase.ts` with your actual config.

## 5. Set Up Firestore Security Rules

Go to Firestore Database > Rules and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /ceos/{document} {
      allow read: if true;
      allow create: if request.auth == null || request.auth.uid != null;
      allow update: if request.auth == null || request.auth.uid != null;
      allow delete: if false; // No deletions allowed
    }
  }
}
```

## 6. Create Indexes (Optional but Recommended)

For better performance, create these compound indexes in Firestore:

1. Collection: `ceos`
   - Fields: `approved` (Ascending), `votes` (Descending)

## 7. Deploy and Test

Your CEO voting system should now be working! The app will:

- Auto-populate with 30 notorious CEOs
- Allow users to vote and submit new CEOs
- Auto-moderate submissions (5 votes needed for approval)
- Show real-time leaderboard updates

## Bandwidth Optimization

The app is optimized for low bandwidth usage:
- Uses Firestore real-time listeners efficiently
- Minimal data transfers with compound queries
- Paginated results (top 50 CEOs by default)
- Auto-moderation reduces spam data
