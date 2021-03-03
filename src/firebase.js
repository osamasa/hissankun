import firebase from 'firebase/app';
import "@firebase/auth";
import "@firebase/database";
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
	    let userdb = firebase.database().ref('users').child(user.uid);
	    userdb.once("value", function(snap) {
		if(snap.val()) {
		    if(snap.val().myname) {
			store.commit('setMyname', snap.val() );
		    }
		    if(snap.val().year) {
			store.commit('setYear', snap.val() );
		    }
		    if(snap.val().myclass) {
			store.commit('setMyclass', snap.val() );
		    }
		    if(snap.val().order) {
			store.commit('setOrder', snap.val() );
		    }
		}
	    });
	});
    },
    saveUser() {
	const user = store.getters.getUser;
	let userdb = firebase.database().ref('users').child(user.uid);
	const uid = user.uid
	userdb.set({
	    'myname' : store.getters.getMyname,
	    'year' : store.getters.getYear,
	    'myclass' : store.getters.getMyclass,
	    'order' : store.getters.getOrder
	}, function(error) {
	    if(error) {
		console.log(error);
	    }
	})
    }
};
