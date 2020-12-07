import React, { Component } from "react";
import { loginUser, registerUser } from "../services/httpservice";
import Form from "./common/form";
import Joi from "joi-browser";

class Login extends Component {
  state = { loginSelected: true, errors: "" };

  loginSchema = {
    userName: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  registerSchema = {
    userName: Joi.string().min(3).max(20).required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
  };

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
        {!this.state.loginSelected && (
          <React.Fragment>
            <h1 className="row justify-content-center mt-4">Why Register?</h1>
            <div className="row justify-content-center my-3">
              <div class="col-xs-12 center-block align">
                <ul className="list ">
                  <li className="item">Look back through wrong answers</li>
                  <li className="item">Allows you to delete your scores</li>
                  <li className="item">Personalised Stats!</li>
                </ul>
              </div>
            </div>
          </React.Fragment>
        )}

        {(this.state.loginSelected && (
          <Form
            title={"Login"}
            errors={this.state.errors}
            onChange={this.handleFormChange}
            onClick={(userName, password) =>
              this.handleLoginSubmit(userName, password)
            }
            schema={this.loginSchema}
            submit={loginUser}
          ></Form>
        )) || (
          <Form
            title={"Register"}
            errors={this.state.errors}
            onChange={this.handleFormChange}
            onClick={(userName, password) =>
              this.handleRegisterSubmit(userName, password)
            }
            schema={this.registerSchema}
            submit={registerUser}
          ></Form>
        )}
      </div>
    );
  }
}

export default Login;
