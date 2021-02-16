import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
	formula : '$$\\require{enclose} \\begin{array}{r}7.6 \\\\[-3pt]25\\enclose{longdiv}{190\\phantom{0}} \\\\[-3pt]\\' + 'underline{175\\phantom{.0}} \\\\[-3pt]15\\phantom{.}0 \\\\[-3pt]\\' +'underline{15\\phantom{.}0} \\\\[-3pt]\\phantom{000}0\\end{array}$$',	
	mediator : {
	    last : null
	},
	calc : [
	    [{x:0,y:0,chr:'',isActive:false},{x:1,y:0,chr:'',isActive:false},{x:2,y:0,chr:'',isActive:false},{x:3,y:0,chr:'',isActive:false},{x:4,y:0,chr:'',isActive:false},{x:5,y:0,chr:'',isActive:false}],	    
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
	updateFormula : (state, payload) => {
	    state.formula = payload.formula;
	},
	updateCalc : (state,payload) => {
	    state.calc = payload;
	},
	updateChrCalc : (state,payload) => {
	    state.calc[parseInt(payload.y)][parseInt(payload.x)].chr = payload.chr;
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
	deleteNumeric(context) {
	    const _x = context.state.mediator.last.x;
	    const _y = context.state.mediator.last.y;
	    context.commit('updateChrCalc', {chr : '', x: _x, y:_y}); 	    
	},
	pushNumeric (context,payload) {
	    let _x = context.state.mediator.last.x;
	    const _y = context.state.mediator.last.y;
	    const _size_x =  context.state.calc[0].length;
	    let i=0;
	    for(i=0;(i+_x)<_size_x && i < payload.chr.length ;i++) {
		context.commit('updateChrCalc', {chr : payload.chr[i], x: _x+i, y:_y}); 
	    }
	    _x = _x+i;
	    if(!(_x < _size_x)) {
		_x=_size_x-1;
	    }
	    context.commit('registerMediator',context.state.calc[_y][_x]);
	}
    },
    modules: {
    }
})
