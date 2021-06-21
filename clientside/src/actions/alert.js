

import uuid from 'uuid';
import { SET_ALERT,REMOVE_ALERT } from './types';

export const setAlert = (msg,alertType) => dispatch => { // This action will call from component(alert component) 
    const id = uuid.v4();
    dispatch({ //This will dispatch the action to the reducer and then the alert reducer's case SET_ALERT: dispatched and the corresponding return's state will get passed down to the component.
        type: SET_ALERT,
        payload: { msg, alertType, id}
    });
}