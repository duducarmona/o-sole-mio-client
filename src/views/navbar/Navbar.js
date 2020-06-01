import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../context/authContext';
import './Navbar.css';

class Navbar extends Component {
  render() {
    const { path } = this.props.rest;
    
    return (
      <nav className='Navbar'>
        <ul>
          <li className={`${path === '/terraces' ? 'active' : ''}`}><Link to='/terraces'><i className="material-icons">deck</i><br/>Terraces</Link></li>
          <li className={`${path === '/mapTerraces' ? 'active' : ''}`}><Link to='/mapTerraces'><i className="material-icons">map</i><br/>Map</Link></li>
          <li className={`${path === '/mapAddTerrace' ? 'active' : ''}`}><Link to='/mapAddTerrace'><i className="material-icons" onClick={this.handleClick}>add_circle</i><br/>Add Terrace</Link></li>
          <li className={`${path === `/user/:id` ? 'active' : ''}`}><Link to={`/user/${this.props.user.data._id}`}><i className="material-icons">person_outline</i><br/>Account</Link></li>
        </ul>
      </nav>
    );
  }
}

export default withAuth(Navbar);