
import './App.css';
import React,{Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

const App = () => {
  return (
    <Fragment>
      <Navbar />

      
      <Router>

        <Route exact path='/' component={Landing} />

        <Switch className="container">

          <Route exact path='/login' component={Login} />

          <Route exact path='/register' component={Register} />

        </Switch>

        

      </Router>


      
    </Fragment>
  );
}

export default App;
