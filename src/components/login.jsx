import React, { Component } from "react";
import { loginUser, registerUser } from "../services/httpservice";
import Form from "./common/form";

class Login extends Component {
  state = { loginSelected: true };

  handleLoginTab = () => {
    const loginSelected = true;
    this.setState({ loginSelected });
  };

  handleRegisterTab = () => {
    const loginSelected = false;
    this.setState({ loginSelected });
  };

  render() {
    return (
      <div
        className="container col-sm- mt-5 mb-2 bg-light d-flex  flex-column mx-auto"
        style={{ height: "auto" }}
      >
        <div className="row">
          <button
            className="col-6 d-flex justify-content-center text-center py-2 border bg-secondary text-white"
            onClick={this.handleLoginTab}
          >
            Login
          </button>
          <button
            className="col-6 d-flex justify-content-center text-center py-2 border bg-secondary text-white"
            onClick={this.handleRegisterTab}
          >
            Register
          </button>
        </div>

        {(this.state.loginSelected && (
          <Form
            title={"Login"}
            onChange={this.handleFormChange}
            onClick={(userName, password) => loginUser(userName, password)}
          ></Form>
        )) || (
          <Form
            title={"Register"}
            onChange={this.handleFormChange}
            onClick={(userName, password) => registerUser(userName, password)}
          ></Form>
        )}
      </div>
    );
  }
}

export default Login;
