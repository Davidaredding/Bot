//import {createStore} from 'redux'
const redux = require('redux');

const NEW_ROBOT = 'NewRobot';

let robotId = 0;

function initialRobotState(robo){
    return Object.assign({},{
        id:-1,
        macAddress: "",
        RSSI:0
    },robo);
}

function initialState(){
    return {bots:[]};
}

const ACTION_HANDLERS = {
    [NEW_ROBOT]: (state=initialState(),action)=>
    {
       return Object.assign({},state,{bots:[...state.bots,
            Object.assign({},initialRobotState(action.data),{id:robotId++})
        ]});
        
    }
}



function robot(state,action){
      const handler =  ACTION_HANDLERS[action.type];
      let s =  handler ? handler(state,action) : state;
      return s;
      
}

store = redux.createStore(robot);

store.subscribe(()=>{
    console.log(store.getState());
})

store.dispatch({type:NEW_ROBOT,data:{RSSI:-27, macAddress:'aa:bb:cc:dd', name:'Bob'}});


