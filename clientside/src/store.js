import { craeteStore,applyMiddleware } from 'redux'; // we implement thunk as middleware so we import applyMiddleware

import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'; //thunk is our moddleware
import rootReducer from './reducers'; //we have multiple reducers. We are combine them in root reducer. We use index.js inside reducers so we dont need to call like ./reducers/index.js

const initialState = {};
const middleware = [thunk];
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;