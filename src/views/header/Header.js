import React, { Component } from "react";
import { withAuth } from '../../context/authContext';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className='Header'>
        <i className='material-icons Header-back' onClick={this.props.history.goBack}>arrow_back</i>
      </div>
    );
  }
}

export default withAuth(Header);
