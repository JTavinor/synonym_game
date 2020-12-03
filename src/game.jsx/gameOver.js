import React, { Component } from "react";
import axios from "axios";

class GameOver extends Component {
  state = { name: "" };

  componentDidMount() {
    if (!this.props.userLoggedIn) {
      const inputField = document.getElementById("name");
      inputField.focus();
    }
  }

  handleChange = (e) => {
    const name = e.currentTarget.value;
    this.setState({ name });
  };

  handleEnterPress = (event) => {
    if (event.code === "Enter") {
      this.props.handlePlayAgain(this.state.name, this.props.score);
    }
  };

  renderLoggedInGameOver = () => {
    return (
      <p className="row justify-content-md-center">
        Press the button to upload your score and play again!
      </p>
    );
  };

  renderAnonGameOver = () => {
    return (
      <React.Fragment>
        <label className="row justify-content-md-center">
          Enter your name to add your score to the leaderboard!
        </label>
        <div className="row justify-content-md-center">
          <input
            className="col-6 "
            id="name"
            onChange={this.handleChange}
            onKeyPress={this.handleEnterPress}
          ></input>
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { score, name, userLoggedIn } = this.props;
    return (
      <div
        className="container col-sm- m-5 bg-light d-flex flex-column mx-auto"
        style={{ height: "420px" }}
      >
        <div className="row justify-content-md-center mt-auto">
          <h2 className="text-capitalize display-4">Game Over</h2>
        </div>
        <div className="row justify-content-md-center mt-auto">
          <h3 className="py-4">You scored {score} points</h3>
        </div>

        {(userLoggedIn && this.renderLoggedInGameOver()) ||
          this.renderAnonGameOver()}

        <div className="row justify-content-md-center my-auto">
          <button
            type="button"
            className="btn btn-primary col-3 m-auto"
            onClick={() => this.props.handlePlayAgain(name, score)}
          >
            Add score and Play again
          </button>
        </div>
      </div>
    );
  }
}

export default GameOver;
