
import firebase from 'firebase';
import cheerio from 'cheerio';

var firebaseConfig = {
    apiKey: "AIzaSyAbW5KJaKC8j1aVNHuRjoVtNGn85_dQEJY",
    authDomain: "salarysprout.firebaseapp.com",
    databaseURL: "https://salarysprout.firebaseio.com",
    projectId: "salarysprout",
    storageBucket: "salarysprout.appspot.com",
    messagingSenderId: "860211845994",
    appId: "1:860211845994:web:4fa316c38e5383cfe56313"
  };
  // Initialize Firebase
  const fbase = firebase.initializeApp(firebaseConfig);

  export { fbase, cheerio }