import React from "react";
import { Route, Redirect } from "react-router-dom";
import NavbarWithAuth from '../views/navbar/Navbar';
import { withAuth } from "../context/authContext";

function PrivateRoute({ component: Comp, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <div>
            <Comp {...props} />
            <NavbarWithAuth />
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
  );
}

export default withAuth(PrivateRoute);
