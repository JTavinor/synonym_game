import React, { Component } from "react";

class Form extends Component {
  state = { userData: {} };

  handleFormChange = ({ currentTarget: input }) => {
    const userData = { ...this.state.userData };
    userData[input.name] = input.value;
    this.setState({ userData });
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="row justify-content-center mt-4">{this.props.title}</h1>
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
          />
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
          />
        </div>

        <button
          className="btn btn-primary mb-4  my-2 mx-auto col-4 p-auto"
          onClick={() =>
            this.props.onClick(
              this.state.userData.userName,
              this.state.userData.password
            )
          }
        >
          Login
        </button>
      </React.Fragment>
    );
  }
}

export default Form;
