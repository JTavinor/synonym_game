import React, { Component } from "react";

class GameScreen extends Component {
  state = {};
  handleEnterPress = (event) => {
    if (event.code === "Enter") {
      this.props.handleSubmitGuess();
    }
  };

  renderLives = () => {
    const hearts = [];
    for (let i = 1; i <= this.props.lives; i++) {
      hearts.push(
        <i
          className="fa fa-heart"
          style={{ color: "red", padding: "0px 2px" }}
          key={i}
        ></i>
      );
    }
    return hearts;
  };

  formatTime = () => {
    let minutes = Math.floor(this.props.timer / 60);
    let seconds = this.props.timer - minutes * 60;
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }
    return `${minutes}:${seconds}`;
  };

  render() {
    return (
      <React.Fragment>
        {!this.props.gameStarted && (
          <div className="row justify-content-center m-auto">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => this.props.startTimer()}
            >
              Start Game
            </button>
          </div>
        )}
        {this.props.gameStarted && (
          <React.Fragment>
            <div className="row justify-content-md-center p-5 mt-auto">
              <h1 className="text-capitalize display-4">
                {this.props.currentWord}
              </h1>
            </div>
            <div className="row justify-content-md-center align-items-center">
              <input
                type="text"
                className="form-control col-8 mx-1 focus"
                id="synonymGuess"
                placeholder="Synonym Guess"
                value={this.props.userGuess}
                onChange={(e) => this.props.handleInputChange(e)}
                onKeyPress={this.handleEnterPress}
              ></input>
              <button
                type="button"
                className="btn btn-primary col-2"
                onClick={() => this.props.handleSubmitGuess()}
              >
                Submit
              </button>
            </div>
          </React.Fragment>
        )}
        <div className="row justify-content-between mt-auto p-3">
          <h4 className="col-4">Lives: {this.renderLives()}</h4>
          <h4 className="col-4 align-content-center">
            Time: {this.formatTime()}
          </h4>
          <h4 className="col-2">Score: {this.props.score}</h4>
        </div>
      </React.Fragment>
    );
  }
}

export default GameScreen;
