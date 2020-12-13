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
    const { data, score } = this.props;
    const topThird = data.length / 3;
    const rank = data.findIndex((element) => element.score === score);
    if (rank <= topThird) {
      return (
        <React.Fragment>
          Top effort! You ranked {rank + 1} out of {topThird * 3}
        </React.Fragment>
      );
    }
    if (topThird < rank && rank <= topThird * 2) {
      return (
        <React.Fragment>
          Not bad! You ranked {rank + 1} out of {topThird * 3}
        </React.Fragment>
      );
    }
    if (topThird * 2 < rank && rank <= topThird * 3) {
      return (
        <React.Fragment>
          Better luck next time! You ranked {rank + 1} out of {topThird * 3}
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
        <h2 className="row justify-content-center my-4">
          You scored {score} points
        </h2>
        <h4 className="row justify-content-center">
          {userLoggedIn && this.renderScoreMessage()}
        </h4>
        {!userLoggedIn && (
          <p className="row justify-content-center text-center">
            <b>
              Create an account to automatically upload your scores and many
              more benefits! Find out more on the{" "}
              {<a href="/login">registration</a>} page!
            </b>
          </p>
        )}
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
