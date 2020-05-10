import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import Protected from './views/auth/Protected';
import LoginWithAuth from './views/auth/Login';
import SignupWithAuth from './views/auth/Signup';
import AddTerraceWithAuth from './views/terraces/AddTerrace';
import Terraces from './views/terraces/Terraces';
import TerraceDetail from './views/terraces/TerraceDetail';
import EditTerrace from './views/terraces/EditTerrace';
import Navbar from './views/navbar/Navbar';

import AuthProvider from './context/authContext';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>
          <div className='App'>
            <Navbar />
            <Switch>
              <AnonRoute exact path={'/login'} component={LoginWithAuth} />
              <AnonRoute exact path={'/signup'} component={SignupWithAuth} />
              <PrivateRoute exact path={'/protected'} component={Protected} />
              <PrivateRoute exact path={'/terraces/add'} component={AddTerraceWithAuth} />
              <PrivateRoute exact path={'/terraces'} component={Terraces} />
              <PrivateRoute exact path={'/terraces/:id'} component={TerraceDetail} />
              <PrivateRoute exact path={'/terraces/:id/edit'} component={EditTerrace} />
            </Switch>
          </div>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
