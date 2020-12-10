import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = { userData: {}, errors: {} };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(
      this.state.userData,
      this.props.schema,
      options
    );

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = {
      [name]: value,
    };
    const fieldSchema = {
      [name]: this.props.schema[name],
    };
    const result = Joi.validate(obj, fieldSchema);
    return result.error ? result.error.details[0].message : null;
  };

  handleFormChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    //Cannot get Joi validation for password confirmation working onChange
    if (this.state.userData.password === input.value) delete errors[input.name];
    else if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const userData = { ...this.state.userData };
    userData[input.name] = input.value;
    this.setState({ userData, errors, submitErrors: "" });
  };

  handleSubmit = async (userName, password) => {
    try {
      await this.props.submit(userName, password);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ submitErrors: ex.response.data });
      }
    }
  };

  handleEnterPress = (event) => {
    if (event.code === "Enter") {
      this.handleSubmit(
        this.state.userData.userName,
        this.state.userData.password
      );
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <h1 className="row justify-content-center mt-2">{this.props.title}</h1>
        <div className="form-group col-8 justify-content-center m-auto py-3">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            name="userName"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            onChange={this.handleFormChange}
            onKeyPress={this.handleEnterPress}
          />
          {(this.state.submitErrors && (
            <div className="alert alert-danger">{this.state.submitErrors}</div>
          )) ||
            (errors.userName && (
              <div className="alert alert-danger">{errors.userName}</div>
            ))}
        </div>
        <div className="form-group col-8 justify-content-center m-auto py-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={this.handleFormChange}
            onKeyPress={this.handleEnterPress}
          />
          {errors.password && (
            <div className="alert alert-danger">{errors.password}</div>
          )}
        </div>

        {this.props.title === "Register" && (
          <div className="form-group col-8 justify-content-center m-auto py-3">
            <label htmlFor="exampleInputPassword1"> Re-Enter Password</label>
            <input
              name="password_confirmation"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Re-Enter Password"
              onChange={this.handleFormChange}
              onKeyPress={this.handleEnterPress}
            />
            {errors.password_confirmation && (
              <div className="alert alert-danger">
                {errors.password_confirmation}
              </div>
            )}
          </div>
        )}

        <button
          className="btn btn-primary mb-4  my-2 mx-auto col-4 p-auto"
          disabled={this.validate()}
          onClick={() =>
            this.handleSubmit(
              this.state.userData.userName,
              this.state.userData.password
            )
          }
        >
          {this.props.title}
        </button>
      </React.Fragment>
    );
  }
}

export default Form;
