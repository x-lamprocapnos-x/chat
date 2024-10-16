# **Chat App**

### This app is a React Native chat platform where users can sign in anonymously and have real-time conversations. Users have the ability to share their location, upload photos, and personalize the chat background. The app uses Firebase for authentication and data storage

## **Table of Contents**
- Features
- Technologies Used
- Installation
- Usage Guide
- Available Scripts
- Contributions
- License

## **Features**
- Anonymous authentication via Firebase.
- Real-time chat functionality.
- Ability to share photos from the library or take pictures.
- Send the user's current location.
- Customize the chat's background color.
- Works on Android, iOS, and Web using Expo.

## **Technologies Used**
- React Native for building the mobile app.
- Firebase for backend authentication and storage.
- Expo for development and testing.
- react-native-maps for location sharing.
- Gifted Chat for the chat UI.

## **Installation**
To set up the project locally, follow these steps:

1. Clone the repository:

`git clone <repository-url>`
`cd chat-app`
2. Install dependencies:
`npm install`
3. Set up Firebase:
-Create a Firebase project at Firebase Console.
-Add a web app and copy the Firebase configuration.
-Replace the Firebase config in your project.
4. Start the app:
`expo start`
5. Use the options provided to launch the app in a simulator or on your phone via Expo Go.

## **Usage Guide**
1. Start Screen:
- Enter a username.
- Select a background color for the chat.
- Press Go to Chat to sign in anonymously and start chatting.
2. Chat Screen:
-Send text messages in real-time.
-Use the + button to:
-Upload a photo.
-Take a new photo.
-Send your current location.
-Messages are persisted in Firebase and loaded when you reconnect.

## **Available Scripts**
1. Start the app:
`npm start`
2. Run on Android:
`npm run android`
3. Run on iOS:
`npm run ios`
4. Run on Web:
`npm run web

## **Contributions**
We welcome contributions from the community! Follow these steps to get started:

1. Fork the repository.
2. Clone your fork locally:
`git clone https://github.com/your-username/chat-app.git`
3. Create a new branch for your feature or fix:
`git checkout -b feature-name`
4. Make your changes and ensure everything works.
5. Commit your changes:
`git commit -m "Add a meaningful message describing your changes"`
6. Push the branch to your forked repository:
`git push origin feature-name`
7. Open a pull request to the main repository.
**Guidelines**
- Ensure code is well-formatted and follows best practices.
- est your changes before committing.
- Write clear commit messages.
- If adding a new feature, update the documentation where applicable.
We appreciate your effort in improving the app! 

## **License**
This project is licensed under the MIT License.
You are free to use, modify, and distribute this software under the terms of the MIT License.
