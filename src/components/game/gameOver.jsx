import React, { Component } from "react";

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
      <p className="row justify-content-center">
        Press the button to upload your score and play again!
      </p>
    );
  };

  renderAnonGameOver = () => {
    return (
      <React.Fragment>
        <label className="row justify-content-center">
          Enter your name to add your score to the leaderboard!
        </label>
        <div className="row justify-content-center">
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
    const { data } = this.props;
    const thirdOfLeaderboardLength = data.length / 3;
    const rank = data.findIndex(
      (element) => element.score === this.props.score
    );
    if (rank <= thirdOfLeaderboardLength) {
      return (
        <React.Fragment>
          You're a genius! You ranked {rank + 1} out of{" "}
          {thirdOfLeaderboardLength * 3}
        </React.Fragment>
      );
    }
    if (thirdOfLeaderboardLength < rank <= thirdOfLeaderboardLength * 2) {
      return (
        <React.Fragment>
          Not bad! You ranked {rank + 1} out of {thirdOfLeaderboardLength * 3}
        </React.Fragment>
      );
    }
    if (thirdOfLeaderboardLength * 2 < rank <= thirdOfLeaderboardLength * 3) {
      return (
        <React.Fragment>
          Dummy! You ranked {rank + 1} out of {thirdOfLeaderboardLength * 3}
        </React.Fragment>
      );
    }
  };

  render() {
    const { score, userLoggedIn } = this.props;
    return (
      <React.Fragment>
        <h2 className="row justify-content-center text-capitalize display-4 mt-4">
          Game Over
        </h2>
        {/* <div className="row justify-content-md-center mt-auto"> */}
        <h2 className="row justify-content-center my-4">
          You scored {score} points
        </h2>
        <h4 className="row justify-content-center">
          {this.renderScoreMessage()}
        </h4>
        {/* </div> */}

        {(userLoggedIn && this.renderLoggedInGameOver()) ||
          this.renderAnonGameOver()}

        <div className="row justify-content-center my-auto">
          <button
            type="button"
            className="btn btn-primary col-md-3 col-5 mx-1"
            onClick={() =>
              this.props.handlePlayAgain(this.state.name, score, true)
            }
          >
            Add score and Play again
          </button>
          <button
            type="button"
            className="btn btn-primary col-md-3 col-5 mx-1"
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
