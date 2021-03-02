import firebase from 'firebase/app';
import "@firebase/auth";
import store from "./store";

const firebaseConfig = {
    apiKey: "AIzaSyCaBGApDd_Z1YP5cWBQh4O30hXJaIk7BQ0",
    authDomain: "hissankun-84bbc.firebaseapp.com",
    databaseURL: "https://hissankun-84bbc-default-rtdb.firebaseio.com",
    projectId: "hissankun-84bbc",
    storageBucket: "hissankun-84bbc.appspot.com",
    messagingSenderId: "619036059033",
    appId: "1:619036059033:web:f744b7507671d5901b9f08"    
};
// Initialize Firebase

export default {
    init() {
	firebase.initializeApp(firebaseConfig);
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    },
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
  },
  logout() {
    firebase.auth().signOut()
  },
  onAuth() {
      firebase.auth().onAuthStateChanged(user => {
	  user = user ? user : {};

	  store.commit('onAuthStateChanged', { user : user } );
	  store.commit('onUserStatusChanged', { status : user.uid ? true : false });
    });
  }
};
