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
	    if(user.uid) {
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
		let mondaidb = firebase.database().ref('mondai').child(user.uid);
		mondaidb.limitToLast(1).orderByChild('mdate').once('child_added', function(snap) {
		    if((snap.val()) && (snap.key !== store.state.keyid)) {
			store.commit('setKeyid',{keyid : snap.key});
			store.commit('setMonnum',snap.val());
			store.commit('setTitle',snap.val());
			store.commit('setAllKouban',snap.val());
			store.commit('setAllBairitsu',snap.val());
			store.commit('setAllSep',snap.val());			
			store.commit('setAllFormula',snap.val());
			store.commit('setAllLawformula',snap.val());
			store.commit('setAllCalc',snap.val());			
		    }
		})
	    }
	});
    },
    async saveUser() {
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
    },
    async saveMondai() {
	const user = store.getters.getUser;
	let mondaidb = firebase.database().ref('mondai').child(user.uid).push();
	const uid = user.uid
	let now = Date(Date.now());
	let keyid = mondaidb.key;
	mondaidb.set( {
	    monnum : store.state.monnum,	    
	    title : store.state.title,
	    lastno : store.state.lastno,
	    kouban : store.state.kouban,
	    bairitsu : store.state.bairitsu,
	    sep : store.state.sep,
	    formula : store.state.formula,
	    lawformula : store.state.lawformula,
	    calc : store.state.calc,
	    cdate : now,
	    mdate : now			       
	},
			     function(error) {
				 if(error) {
				     console.log(error);
				 }
			     })
	store.commit('setKeyid', {keyid : keyid});
    },
    async updateMondai() {
	const user = store.getters.getUser;
	const keyid = store.getters.getKeyid;
	let mondaidb = firebase.database().ref('mondai').child(user.uid + '/' + keyid)
	const uid = user.uid
	let now = Date(Date.now());

	mondaidb.update( {
	    monnum : store.state.monnum,
	    title : store.state.title,
	    kouban : store.state.kouban,
	    bairitsu : store.state.bairitsu,
	    sep : store.state.sep,
	    formula : store.state.formula,
	    lawformula : store.state.lawformula,
	    calc : store.state.calc,
	    mdate : now			       
	},
			     function(error) {
				 if(error) {
				     console.log(error);
				 }
			     })
    }        
};
