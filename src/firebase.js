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
		    } else {
			store.commit('setDialog', { dialog : true });
		    }
		});
		let mondaidb = firebase.database().ref('mondai').child(user.uid);
		mondaidb.limitToLast(1).orderByChild('mdate').once("child_added", function(snap) {
		    if((snap.val()) && (snap.key !== store.state.keyid)) {
			store.commit('setKeyid',{keyid : snap.key});
			store.commit('setMonnum',{monnum : snap.val().monnum});
			store.commit('setTitle',{title : snap.val().title});
			store.commit('setAllKouban',{kouban : snap.val().kouban});
			store.commit('setLastno',{lastno : snap.val().lastno});		
			store.commit('setAllBairitsu',{bairitsu : snap.val().bairitsu});
			store.commit('setAllSep',{sep : snap.val().sep});
			store.commit('setAllFormula',{formula : snap.val().formula});
			store.commit('setAllLawformula',{lawformula : snap.val().lawformula});
			store.commit('setAllCalc',{calc : snap.val().calc});

		    }
		})
	    }
	});
    },
    deleteMondai(key) {
	const user = store.getters.getUser;
	let mondaidb = firebase.database().ref('mondai/' + user.uid).child(key);
	mondaidb.remove(err => {
	    if(err) {
		store.commit('AppMessage' ,{'mtype' : 'Error', 'message' : 'Error ' + err});
	    } else {
		store.commit('AppMessage' ,{'mtype' : 'Success', 'message' : '削除完了'});
	    }
	})
    },
    getMondai(key) {
	const user = store.getters.getUser;
	let mondaidb = firebase.database().ref('mondai/' + user.uid).child(key);
	mondaidb.once("value", function(snap) {
	    if((snap.val()) && (snap.key !== store.state.keyid)) {
		store.commit('setKeyid',{keyid : snap.key});
		store.commit('setMonnum',{monnum : snap.val().monnum});
		store.commit('setLastno',{lastno : snap.val().lastno});		
		store.commit('setTitle',{title : snap.val().title});
		store.commit('setAllKouban',{kouban : snap.val().kouban});
		store.commit('setAllBairitsu',{bairitsu : snap.val().bairitsu});
		store.commit('setAllSep',{sep : snap.val().sep});
		store.commit('setAllFormula',{formula : snap.val().formula});
		store.commit('setAllLawformula',{lawformula : snap.val().lawformula});
		store.commit('setAllCalc',{calc : snap.val().calc});
		
	    }
	})
    },
    loadMondai(p) {
	const user = store.getters.getUser;
	if(user.uid) {
	    let mondaidb = firebase.database().ref('mondai/' + user.uid);
	    mondaidb.orderByChild('mdate').on('value', function(snap) {
		store.commit('resetRetvalue');		
		snap.forEach(r => {
		    store.commit('addRetvalue', { key   : r.key ,
						  mdate : r.val().mdate ,
						  title : r.val().title});
		});
	    });
	}
    },
    getMondaiCount() {
	const user = store.getters.getUser;
	if(user.uid) {
	    let mondaidb = firebase.database().ref('mondai/' + user.uid);	
	    mondaidb.on('value', parent => {
		store.commit('setAllmondainum',{
		    'allmondainum' : parent.numChildren()
		});
	    });
	}
	    
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
		    store.commit('AppMessage' ,{'mtype' : 'Errro', 'message' : 'ユーザ名保存エラー ' + error});		    
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
			      store.commit('AppMessage' ,{'mtype' : 'Errro', 'message' : '問題保存エラー ' + error});		    
			  } else {
			      store.commit('AppMessage' ,{'mtype' : 'Success', 'message' : '保存完了'});
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
			      store.commit('AppMessage' ,{'mtype' : 'Errro', 'message' : '問題更新エラー ' + error});		    
			  } else {
			      store.commit('AppMessage' ,{'mtype' : 'Success', 'message' : '更新完了'});
			  }
			 }
		       )
    }
};
