import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import { withAuth } from "../context/authContext";

class AnonRoute extends Component {
  render() {
    const { component: Comp, isLoggedIn, ...rest } = this.props;

    return(
      <div>
        <Route
          {...rest}
          render={(props) =>
            !isLoggedIn ? (
              <Comp {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/terraces",
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

export default withAuth(AnonRoute);