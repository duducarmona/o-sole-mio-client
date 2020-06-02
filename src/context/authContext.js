import React, { Component } from "react";
import apiClient from "../services/apiClient";
import { toast } from 'react-toastify';

export const AuthContext = React.createContext();

export const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({ handleLogin, handleSignup, user, isLoggedIn, handleLogout }) => {
            return (
              <Comp
                onLogin={handleLogin}
                onSignup={handleSignup}
                user={user}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                {...this.props}
              />
            );
          }}
        </AuthContext.Consumer>
      );
    }
  };
};

class AuthProvider extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    apiClient
      .whoami()
      .then((user) => {
        this.setState({
          isLoading: false,
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          user: null,
        });
      });
  }

  handleLogin = ({ username, password }) => {
    apiClient
      .login({ username, password })
      // .then(({ data: user }) => {
      .then((user) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        toast.error('Username or Password incorrect');

        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  handleSignup = ({ username, password }) => {
    apiClient
      .signup({ username, password })
      // .then(({ data: user }) => {
      .then((user) => {
        this.setState({
          isLoggedIn: true,
          user,
        });
      })
      .catch((error) => {
        toast.error('Username already exist');
        
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      });
  };

  handleLogout = () => {
    apiClient
      .logout()
      .then(() => {
        this.setState({
          isLoggedIn: false,
          user: null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { children } = this.props;
    const { isLoggedIn, user, isLoading } = this.state;
    
    return (
      isLoading ? (<div>Loading...</div>) : 
      <AuthContext.Provider
        value={{
          isLoggedIn,
          user,
          handleLogin: this.handleLogin,
          handleSignup: this.handleSignup,
          handleLogout: this.handleLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
