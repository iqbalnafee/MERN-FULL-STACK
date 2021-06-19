
import './App.css';
import React,{Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

//Redux
import { Provider } from 'react-redux'; //this will connect both react and redux.
import  store  from './store';

const App = () => {
  return (

    //using provider, all the components that we create, can access our app level state through redux

    <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />

        
        

          <Route exact path='/' component={Landing} />

          <Switch className="container">

            <Route exact path='/login' component={Login} />

            <Route exact path='/register' component={Register} />

          </Switch>

          

        


        
      </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
