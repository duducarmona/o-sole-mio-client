import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../context/authContext';

class Navbar extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to='/terraces'>Terraces</Link></li>
          <li><Link to='/terraces/add'>Add Terrace</Link></li>
          <li><Link to={`/user/${this.props.user.data._id}`}>User Account</Link></li>
        </ul>
      </nav>
    );
  }
}

export default withAuth(Navbar);