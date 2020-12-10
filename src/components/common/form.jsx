import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = { userData: {}, errors: {} };

  validateForm = () => {
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

  validateProperty = ({ name: fieldName, value }) => {
    const obj = {
      [fieldName]: value,
    };
    const fieldSchema = {
      [fieldName]: this.props.schema[fieldName],
    };
    const result = Joi.validate(obj, fieldSchema);
    return result.error ? result.error.details[0].message : null;
  };

  handleFormChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    //Cannot get Joi validation for 'Password Confirmation' field  working on Input change so have done it manually
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

  renderInputs = () => {
    const { inputData } = this.props;
    const { errors } = this.state;
    return inputData.map((input) => (
      <div className="form-group col-8 justify-content-center m-auto py-3">
        <label htmlFor={input.name}>{input.title}</label>
        <input
          name={input.name}
          type={input.type}
          className="form-control"
          id={input.name}
          placeholder={input.placeholder}
          onChange={this.handleFormChange}
          onKeyPress={this.handleEnterPress}
        />
        {inputData.indexOf(input) === 0 && this.state.submitErrors && (
          <div className="alert alert-danger">{this.state.submitErrors}</div>
        )}
        {errors[input.name] && (
          <div className="alert alert-danger">{errors[input.name]}</div>
        )}
      </div>
    ));
  };

  render() {
    const { title } = this.props;
    return (
      <React.Fragment>
        <h1 className="row justify-content-center mt-2">{title}</h1>

        {this.renderInputs()}

        <button
          className="btn btn-primary mb-4  my-2 mx-auto col-4 p-auto"
          disabled={this.validateForm()}
          onClick={() =>
            this.handleSubmit(
              this.state.userData.userName,
              this.state.userData.password
            )
          }
        >
          {title}
        </button>
      </React.Fragment>
    );
  }
}

export default Form;
