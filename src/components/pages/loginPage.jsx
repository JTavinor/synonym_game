import React, { Component } from "react";
import RegisterForm from "../forms/registerForm";
import LoginForm from "../forms/loginForm";
import Header from "../common/header";

class Login extends Component {
  state = { loginSelected: false };

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
        <Header
          titleOne={"Login"}
          titleTwo={"Register"}
          handleTabOne={this.handleLoginTab}
          handleTabTwo={this.handleRegisterTab}
        />
        {(this.state.loginSelected && <LoginForm />) || <RegisterForm />}
      </div>
    );
  }
}

export default Login;
