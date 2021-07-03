//import types
import { SET_ALERT,REMOVE_ALERT } from '../actions/types'

import { Provider } from "react-redux";
import { createStore } from "redux";


// alert is our reducer which is just a function

const initialState = [];
const alertReducer = (state=initialState, action) => {

    //this action is going to contain two things
    // 1. actionType, which is mandatory
    // 2. payload , which will be the data

    const {type,payload} = action;

    // actionType is need to evaluate and we are gonna do that with switch statement

    switch(type){

        case SET_ALERT:
            return [...state,payload]; // this will send to layout's alert.js component
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }

}

export default alertReducer;