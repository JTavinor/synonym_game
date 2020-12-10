import React, { Component } from "react";
import { registerUser } from "../services/httpservice";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Component {
  state = { errors: "" };

  registerSchema = {
    userName: Joi.string().min(3).max(20).required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    password_confirmation: Joi.string()
      .equal(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } })
      .label("Password confirmation"),
  };

  render() {
    return (
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

        <Form
          title={"Register"}
          errors={this.state.errors}
          //   onChange={this.handleFormChange}
          //   onClick={(userName, password) =>
          //     this.handleRegisterSubmit(userName, password)
          //   }
          schema={this.registerSchema}
          submit={registerUser}
        ></Form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
