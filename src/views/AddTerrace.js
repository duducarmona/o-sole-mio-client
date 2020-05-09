import React, { Component } from "react";
import apiClient from "../services/apiClient";
import { withAuth } from "../context/authContext";

class AddTerrace extends Component {
  state = {
    name: '',
    userId: this.props.user.data._id,
    description: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { name, userId, description } = this.state;
    
    apiClient
      .createTerrace({ name, userId, description })
      .then((res) => {
        history.push("/protected");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h1>Add Terrace</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={this.handleChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            onChange={this.handleChange}
          />
          {/* <label htmlFor="longitude">Lon</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            onChange={this.handleChange}
          /> */}
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default withAuth(AddTerrace);
