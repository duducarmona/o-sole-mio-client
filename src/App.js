import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import Protected from './views/Protected';
import LoginWithAuth from './views/Login';
import SignupWithAuth from './views/Signup';
import AddTerraceWithAuth from './views/AddTerrace';
import Terraces from './views/Terraces';

import AuthProvider from './context/authContext';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>
          <div className='App'>
            <Switch>
              <AnonRoute exact path={'/login'} component={LoginWithAuth} />
              <AnonRoute exact path={'/signup'} component={SignupWithAuth} />
              <PrivateRoute exact path={'/protected'} component={Protected} />
              <PrivateRoute exact path={'/terraces/add'} component={AddTerraceWithAuth} />
              <PrivateRoute exact path={'/terraces'} component={Terraces} />
            </Switch>
          </div>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
