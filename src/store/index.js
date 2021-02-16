import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
	mediator : {
	    last : null
	},
	calc : [
	    [{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false}],	    
	    [{chr:'5',isActive:false},{chr:')',isActive:false},{chr:'1',isActive:false},{chr:'2',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false}],
	    [{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false}],
	    [{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false}],
	    [{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false}],
	    [{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false}],	    
	],	
    },
    getters: {
	getCalc : function(state) {
	    return state.calc;
	}
    },
    mutations: {
	updateCalc : (state,payload) => {
	    state.calc = payload;
	},
	registerMediator: (state, payload) => {
	    if(state.mediator.last != null) {
		state.mediator.last.isActive=false;
	    }
	    state.mediator.last = state.calc[parseInt(payload.y)][parseInt(payload.x)];
	    state.mediator.last.isActive=true;
	},
	setCalc : (state,payload) => {
	    if(typeof payload.isActive !== 'undefined') {
		state.calc[parseInt(payload.y)][parseInt(payload.x)].isActive = payload.isActive;
	    }
	    if(typeof payload.chr !== 'undefined') {
		state.calc[parseInt(payload.y)][parseInt(payload.x)].chr = payload.chr;
	    }	    
	}
    },
    actions: {
    },
    modules: {
    }
})
