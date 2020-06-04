import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import Protected from './views/auth/Protected';
import LoginWithAuth from './views/auth/Login';
import SignupWithAuth from './views/auth/Signup';
import AddTerraceWithAuth from './views/terraces/AddTerrace';
import Terraces from './views/terraces/Terraces';
import TerraceDetailWithAuth from './views/terraces/TerraceDetail';
import EditTerrace from './views/terraces/EditTerrace';
import AddReviewWithAuth from './views/reviews/AddReview';
import ReviewsWithAuth from './views/reviews/Reviews';
import EditReview from './views/reviews/EditReview';
import User from './views/auth/User';
import UpdateTerraceState from './views/terraces/UpdateTerraceState';
import MapTerraces from './views/terraces/MapTerraces';
import MapAddTerrace from './views/terraces/MapAddTerrace';
import MapEditTerrace from './views/terraces/MapEditTerrace';

import AuthProvider from './context/authContext';
import NotFoundPage from './views/NofFoundPage/NotFoundPage';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>
          <div className='App'>
            <Switch>
              <AnonRoute exact path={'/'} component={LoginWithAuth} />
              <AnonRoute exact path={'/signup'} component={SignupWithAuth} />
              <PrivateRoute exact path={'/protected'} component={Protected} />
              <PrivateRoute exact path={'/terraces/add'} component={AddTerraceWithAuth} />
              <PrivateRoute exact path={'/terraces'} component={Terraces} />
              <PrivateRoute exact path={'/terraces/:id'} component={TerraceDetailWithAuth} />
              <PrivateRoute exact path={'/terraces/:id/edit'} component={EditTerrace} />
              <PrivateRoute exact path={'/terraces/:id/reviews/add'} component={AddReviewWithAuth} />
              <PrivateRoute exact path={'/terraces/:id/reviews'} component={ReviewsWithAuth} />
              <PrivateRoute exact path={'/reviews/:id/edit'} component={EditReview} />
              <PrivateRoute exact path={'/user/:id'} component={User} />
              <PrivateRoute exact path={'/terraces/:id/updates'} component={UpdateTerraceState} />
              <PrivateRoute exact path={'/mapTerraces'} component={MapTerraces} />
              <PrivateRoute exact path={'/mapAddTerrace'} component={MapAddTerrace} />
              <PrivateRoute exact path={'/mapEditTerrace'} component={MapEditTerrace} />
              <PrivateRoute exact path={'/notFoundPage'} component={NotFoundPage} />
              <PrivateRoute path='*' component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
