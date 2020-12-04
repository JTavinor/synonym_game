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
      this.props.handlePlayAgain(this.state.name, this.props.score, true);
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

  renderScoreMessage = () => {
    console.log("score message");
    const { data } = this.props;
    const leaderboardLength = data.length;
    const rank = data.findIndex(
      (element) => element.score === this.props.score
    );
    if (rank <= leaderboardLength / 3) {
      return (
        <h3>
          You're a genius! You ranked {rank + 1} out of {leaderboardLength}
        </h3>
      );
    }
    if (leaderboardLength / 3 < rank <= (leaderboardLength * 2) / 3) {
      return (
        <h3>
          Not bad! You ranked {rank + 1} out of {leaderboardLength}
        </h3>
      );
    }
    if ((leaderboardLength * 2) / 3 < rank <= leaderboardLength) {
      return (
        <h3>
          Dummy! You ranked {rank + 1} out of {leaderboardLength}
        </h3>
      );
    }
  };

  render() {
    console.log(this.props.data);
    const { score, name, userLoggedIn } = this.props;
    return (
      <React.Fragment>
        <div className="row justify-content-md-center mt-auto">
          <h2 className="text-capitalize display-4">Game Over</h2>
        </div>
        {/* <div className="row justify-content-md-center mt-auto"> */}
        <h3 className="py-4 row justify-content-md-center m-auto py-0">
          You scored {score} points
        </h3>
        <h3 className="py-4 row justify-content-md-center m-auto py-0">
          {this.renderScoreMessage()}
        </h3>
        {/* </div> */}

        {(userLoggedIn && this.renderLoggedInGameOver()) ||
          this.renderAnonGameOver()}

        <div className="row justify-content-center my-auto">
          <button
            type="button"
            className="btn btn-primary col-3 mx-1"
            onClick={() =>
              this.props.handlePlayAgain(this.state.name, score, true)
            }
          >
            Add score and Play again
          </button>
          <button
            type="button"
            className="btn btn-primary col-3  mx-1"
            onClick={() =>
              this.props.handlePlayAgain(this.state.name, score, false)
            }
          >
            Play again without adding score
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default GameOver;
