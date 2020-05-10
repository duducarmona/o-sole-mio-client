import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from '../views/navbar/Navbar';
import { withAuth } from "../context/authContext";

function PrivateRoute({ component: Comp, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <div>
            <Navbar />
            <Comp {...props} />
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
