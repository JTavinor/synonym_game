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
    const { timer: currentTime } = this.props;
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime - minutes * 60;
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }
    return `${minutes}:${seconds}`;
  };

  render() {
    return (
      <React.Fragment>
        {!this.props.gameStarted && (
          <div className="row justify-content-center my-auto">
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
            <div className="row justify-content-center pt-5 pb-4 mt-auto">
              <h1 className="text-capitalize display-4">
                {this.props.currentWord}
              </h1>
            </div>
            <div className="row justify-content-center align-items-center mb-auto">
              <input
                type="text"
                className="form-control col-8 mx-1 focus"
                id="synonymGuess"
                placeholder="Associated word guess"
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
        <div className="row justify-content-between p-3">
          <h4 className="col-md-4 col-xs-12 text-center text-md-left">
            Lives: {this.renderLives()}
          </h4>
          <h4 className="col-md-4 col-xs-12 align-content-center text-center">
            Time Remaining: {this.formatTime()}
          </h4>
          <h4 className="col-md-4 col-xs-12 align-content-md-right text-md-right text-center">
            Score: {this.props.score}
          </h4>
        </div>
      </React.Fragment>
    );
  }
}

export default GameScreen;
