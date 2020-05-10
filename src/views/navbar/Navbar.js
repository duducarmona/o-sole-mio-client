import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to='/terraces'>Terraces</Link></li>
          <li><Link to='/terraces/add'>Add Terrace</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;