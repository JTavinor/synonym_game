import React, { Component } from "react";
import axios from "axios";

class GameOver extends Component {
  state = { name: "" };

  handleChange = (e) => {
    const name = e.currentTarget.value;
    this.setState({ name });
  };

  render() {
    return (
      <div
        className="container col-sm- m-5 bg-light d-flex flex-column mx-auto"
        style={{ height: "420px" }}
      >
        <div className="row justify-content-md-center mt-auto">
          <h2 className="text-capitalize display-4">Game Over</h2>
        </div>
        <div className="row justify-content-md-center">
          <p>You scored {this.props.score} points</p>
        </div>
        <div className="row justify-content-md-center">
          <label className="col-4">
            Enter your name to add your score to the leaderboard!
          </label>
          <input
            className="col-4"
            id="name"
            onChange={this.handleChange}
          ></input>
        </div>
        <div className="row justify-content-md-center my-auto">
          <button
            type="button"
            className="btn btn-primary col-2"
            onClick={() =>
              this.props.handlePlayAgain(this.state.name, this.props.score)
            }
          >
            Add score and Play again
          </button>
        </div>
      </div>
    );
  }
}

export default GameOver;
