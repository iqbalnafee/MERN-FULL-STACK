//import types
import { SET_ALERT,REMOVE_ALERT } from '../actions/types'


// alert is our reducer which is just a function

const initialState = [];
export default function(state=initialState, action){

    //this action is going to contain two things
    // 1. actionType, which is mandatory
    // 2. payload , which will be the data

    const {type,payload} = action

    // actionType is need to evaluate and we are gonna do that with switch statement

    switch(action.type){

        case SET_ALERT:
            return [...state,payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }

}