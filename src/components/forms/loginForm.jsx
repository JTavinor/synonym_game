import React, { Component } from "react";
import { loginUser } from "../../services/authServices";
import Form from "../common/form";
import Joi from "joi-browser";

class LoginForm extends Component {
  loginSchema = {
    userName: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  render() {
    return (
      <Form
        title={"Login"}
        schema={this.loginSchema}
        submit={loginUser}
        inputData={[
          {
            title: "Username",
            name: "userName",
            placeholder: "Enter Username",
            type: "text",
          },
          {
            title: "Password",
            name: "password",
            placeholder: "Enter Password",
            type: "password",
          },
        ]}
      ></Form>
    );
  }
}

export default LoginForm;
