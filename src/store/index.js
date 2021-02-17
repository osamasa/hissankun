import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
	lastno : 0,
	bairitsu : [{'id': 0, 'cd' : 100}],
	sep : [{'id': 0, 'cd' : '/'}],
	formula : [{'id': 0, 'cd' : '$$\\require{enclose} \\begin{array}{r}7.6 \\\\[-3pt]25\\enclose{longdiv}{190\\phantom{0}} \\\\[-3pt]\\' + 'underline{175\\phantom{.0}} \\\\[-3pt]15\\phantom{.}0 \\\\[-3pt]\\' +'underline{15\\phantom{.}0} \\\\[-3pt]\\phantom{000}0\\end{array}$$'}],
	mediator : {
	    last : null
	},
	lawformula : [{'id': 0, 'cd' : '12/5'}],
	calc : [{'id': 0, 'cd' : [
	    [{x:0,y:0,chr:'',isActive:false},{x:1,y:0,chr:'',isActive:false},{x:2,y:0,chr:'',isActive:false},{x:3,y:0,chr:'',isActive:false},{x:4,y:0,chr:'',isActive:false},{x:5,y:0,chr:'',isActive:false}],	    
	    [{chr:'5',isActive:false},{chr:')',isActive:false},{chr:'1',isActive:false},{chr:'2',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false}],
	    [{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false}],
	    [{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false}],
	    [{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false}],
	    [{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false},{chr:'',isActive:false}],	    
	]}],
    },
    getters: {
	getBairitsu: (state) => (payload) => {
	    let _id = parseInt(payload.id);
	    return state.bairitsu.find( a => a.id == _id ).cd;
	},
	getCalc : (state) => (payload) => {
	    let _id = parseInt(payload.id);
	    return state.calc.find( a => a.id == _id ).cd;
	},
	getLawformula :  (state) => (payload) => {
	    let _id = parseInt(payload.id);
	    return state.lawformula.find( a => a.id == _id ).cd;
	},
	getAllFormula : (state) => {
	    return state.formula;
	},
	getformula :  (state) => (payload) => {
	    let _id = parseInt(payload.id);
	    return state.formula.find( a => a.id == _id ).cd;
	},	
	getSep :  (state) => (payload) => {
	    let _id = parseInt(payload.id);
	    return state.sep.find( a => a.id === _id ).cd;
	}	
    },
    mutations: {
	setBairitsu: (state, payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.lawformula.findIndex( a => a.id == _id );
	    let bairitsu = state.bairitsu[i].cd;
	    if(payload.command==='+') {
		bairitsu += 10;
	    } else {
		bairitsu -= 10;
		if(bairitsu < 10) {
		    bairitsu = 10
		}
	    }
	    state.bairitsu[i].cd=bairitsu;
	},	
	setLawformula : (state, payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.lawformula.findIndex( a => a.id == _id );
	    state.lawformula[i].cd=payload.lawformula;
	},
	setSep : (state, payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.sep.findIndex( a => a.id == _id );
	    state.sep[i].cd = payload.sep;
	},
	updateFormula : (state, payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.formula.findIndex( a => a.id == _id );	    
	    state.formula[i].cd = payload.formula;
	},
	updateCalc : (state,payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.calc.findIndex( a => a.id == _id );
	    state.calc[i].cd = payload.calc.concat();
	},
	updateChrCalc : (state,payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.calc.findIndex( a => a.id == _id );
	    state.calc[i].cd[parseInt(payload.y)][parseInt(payload.x)].chr = payload.chr;
	},
	registerMediator: (state, payload) => {
	    let _id = parseInt(payload.id);
	    if(state.mediator.last != null) {
		state.mediator.last.isActive=false;
	    }
	    let i = state.calc.findIndex( a => a.id == _id );
	    state.mediator.last = state.calc[i].cd[parseInt(payload.y)][parseInt(payload.x)];
	    state.mediator.last.isActive=true;
	},
	setCalc : (state,payload) => {
	    let _id = parseInt(payload.id);
	    let i = state.calc.findIndex( a => a.id == _id );	    
	    if(typeof payload.isActive !== 'undefined') {
		state.calc[i].cd[parseInt(payload.y)][parseInt(payload.x)].isActive = payload.isActive;
	    }
	    if(typeof payload.chr !== 'undefined') {
		state.calc[i].cd[parseInt(payload.y)][parseInt(payload.x)].chr = payload.chr;
	    }	    
	}
    },
    actions: {
	moveUpNumeric(context,payload) {
	    const _id = parseInt(payload.id);
	    const _x = context.state.mediator.last.x;
	    let _y = context.state.mediator.last.y;
	    _y--;
	    if(_y < 0)
		_y=0;
	    context.commit('registerMediator',{'x': _x, 'y': _y , 'id' : _id});
	},
	moveDownNumeric(context,payload) {
	    const _id = parseInt(payload.id);
	    const _x = context.state.mediator.last.x;
	    let _y = context.state.mediator.last.y;
	    _y++;
	    let i = context.state.calc.findIndex( a => a.id == _id );
	    if(!(_y < context.state.calc[i].cd.length)) {
		_y=context.state.calc[i].cd.length-1;
	    }
	    context.commit('registerMediator',{'x': _x, 'y': _y , 'id' : _id});
	},
	moveLeftNumeric(context,payload) {
	    const _id = parseInt(payload.id);
	    let _x = context.state.mediator.last.x;
	    const _y = context.state.mediator.last.y;
	    _x--;
	    if(_x < 0)
		_x=0;
	    context.commit('registerMediator',{'x': _x, 'y': _y , 'id' : _id});
	},
	moveRightNumeric(context,payload) {
	    const _id = parseInt(payload.id);	    
	    let _x = context.state.mediator.last.x;
	    const _y = context.state.mediator.last.y;
	    _x++;
	    let i = context.state.calc.findIndex( a => a.id == _id );	    	    
	    if(!(_x < context.state.calc[i].cd[0].length)) {
		_x=context.state.calc[i].cd[0].length-1;
	    }
	    context.commit('registerMediator',{'x': _x, 'y': _y , 'id' : _id});
	},		
	deleteBackNumeric(context,payload) {
	    const _id = parseInt(payload.id);	    
	    let _x = context.state.mediator.last.x;
	    const _y = context.state.mediator.last.y;
	    _x--
	    if(_x<0)
		_x=0;
	    context.commit('updateChrCalc', {chr : '', x: _x, y:_y, 'id' : _id});
	    context.commit('registerMediator',{'x': _x, 'y': _y , 'id' : _id});
	},
	deleteNumeric(context,payload) {
	    const _id = parseInt(payload.id);		
	    const _x = context.state.mediator.last.x;
	    const _y = context.state.mediator.last.y;
	    context.commit('updateChrCalc', {chr : '', x: _x, y:_y, 'id' : _id});		
	},
	pushNumeric (context,payload) {
	    const _id = parseInt(payload.id);	    
	    let _x = context.state.mediator.last.x;
	    const _y = context.state.mediator.last.y;
	    let l = context.state.calc.findIndex( a => a.id == _id );	    
	    const _size_x =  context.state.calc[l].cd[0].length;
	    let i=0;

	    for(i=0;(i+_x)<_size_x && i < payload.chr.length ;i++) {
		let _payload={chr : payload.chr[i], x: _x+i, y:_y, id: _id};
		context.commit('updateChrCalc', _payload); 
	    }
//	    _x = _x+i;
//	    if(!(_x < _size_x)) {
//		_x=_size_x-1;
//	    }
//	    context.commit('updateChrCalc', {chr : '', x: _x, y:_y, 'id' : _id});
	}
    },
    modules: {
    }
})
