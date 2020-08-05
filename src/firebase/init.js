// Your web app's Firebase configuration
import firebase from "firebase";
import firestore from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCMuTpGRXU9cnT_BGo7puwCE7ZFPDD9AMY",
  authDomain: "movie-vue-app-38ef6.firebaseapp.com",
  databaseURL: "https://movie-vue-app-38ef6.firebaseio.com",
  projectId: "movie-vue-app-38ef6",
  storageBucket: "movie-vue-app-38ef6.appspot.com",
  messagingSenderId: "756503816994",
  appId: "1:756503816994:web:19f5a8cd163d5cc0cf137b",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

//export firestore database
export default firebaseApp.firestore();
