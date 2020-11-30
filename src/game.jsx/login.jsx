import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = { data: {} };

  handleLogin = async () => {
    const { data: jwt } = await axios.post("http://localhost:5000/auth", {
      userName: this.state.data.userName,
      password: this.state.data.password,
    });
    localStorage.setItem("x-auth-token", jwt);
    window.location = "/";
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  render() {
    return (
      <div
        className="container col-sm- mt-5 mb-2 bg-light d-flex py-3 flex-column mx-auto"
        style={{ height: "auto" }}
      >
        <h1>Login </h1>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            name="userName"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </div>

        <button className="btn btn-primary" onClick={() => this.handleLogin()}>
          Submit
        </button>
      </div>
    );
  }
}

export default Login;
