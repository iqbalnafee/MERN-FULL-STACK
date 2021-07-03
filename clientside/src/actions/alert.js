

import {v4 as uuid}  from 'uuid';
import { SET_ALERT,REMOVE_ALERT } from './types';
import alertReducer from '../reducers/alert';

export const setAlert = (msg,alertType) =>  { // This action will call from component(alert component) 
    const id = uuid();
    alertReducer({ //This will dispatch the action to the reducer and then the alert reducer's case SET_ALERT: dispatched and the corresponding return's state will get passed down to the component.
        type: SET_ALERT,
        payload: { msg, alertType, id}
    });

    setTimeout(() => 

    alertReducer({
            type: REMOVE_ALERT,
            payload: id
        }),
        5000
    );
}