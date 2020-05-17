import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NavbarWithAuth from '../views/navbar/Navbar';
import { withAuth } from "../context/authContext";
import './PrivateRoute.css';

class PrivateRoute extends Component {
  render() {
    const { component: Comp, isLoggedIn, ...rest } = this.props;

    return(
      <div className='PrivateRoute'>
        <Route
          {...rest}
          render={(props) =>
            isLoggedIn ? (
              <div>
                <Comp {...props} />
                <NavbarWithAuth rest={rest}/>
              </div>
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      </div>
    );
  }
}

export default withAuth(PrivateRoute);