import firebase from 'firebase';
require ('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyA6FxirZaxCQLaDM0wAYD7Lyg7-NGl0g34",
    authDomain: "booksanta-8cd81.firebaseapp.com",
    projectId: "booksanta-8cd81",
    storageBucket: "booksanta-8cd81.appspot.com",
    messagingSenderId: "652078157104",
    appId: "1:652078157104:web:08b33c1b1f1fa6fef00cf5"
  };

  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()