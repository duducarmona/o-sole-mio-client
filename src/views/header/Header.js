import React, { Component } from "react";
import { withAuth } from '../../context/authContext';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className='Header'>
        <div className='Header-container'>
          <div className='Header-back-container'>
            <i className='material-icons Header-back' onClick={this.props.history.goBack}>arrow_back</i>
          </div>
          <h1 className='Header-h1'>O Sole Mio</h1>
        </div>
      </div>
    );
  }
}

export default withAuth(Header);
