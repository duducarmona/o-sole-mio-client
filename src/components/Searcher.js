import React, { Component } from "react";
import './Searcher.css';

class Searcher extends Component {
  state = {
    searchValue: ''
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });

    this.props.setFilterTerraces(e.target.value);
  }

  render() {
    const { searchValue } = this.state;

    return (
      <div className='Searcher'>
        <input className='Searcher-text' id="searchValue" type="text" name="searchValue" value={searchValue} onChange={this.handleInput} placeholder='Search'></input>
      </div>
    );
  }
}

export default Searcher;
