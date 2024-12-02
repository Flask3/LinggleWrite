import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXPB1Djx-IEMf-9B144Ko3mi4EU7TP7jQ",
  authDomain: "linggle-write.firebaseapp.com",
  projectId: "linggle-write",
  storageBucket: "linggle-write.appspot.com",
  messagingSenderId: "881008859930",
  appId: "1:881008859930:web:f6b5b341d6d92bdc5aeaa3",
  measurementId: "G-D3QDS0ZG83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function signInwithGoogle(updateUserInfo, updateCurrentPage) {
  signInWithPopup(auth, provider)
.then((result) => {

  console.log(result.user.displayName)
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  console.log(credential)
  // const token = credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  updateUserInfo(result.user)
  updateCurrentPage("Home")
}).catch((error) => {
  console.log(error)
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.customData.email;
  // The AuthCredential type that was used.
  const credential = GoogleAuthProvider.credentialFromError(error);
  // ...
});
}