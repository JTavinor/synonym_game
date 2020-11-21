import React, { Component } from "react";

class GameOver extends Component {
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
        <div className="row justify-content-md-center mb-auto">
          <button
            type="button"
            class="btn btn-primary col-2"
            onClick={() => this.props.handlePlayAgain()}
          >
            Play again
          </button>
        </div>
      </div>
    );
  }
}

export default GameOver;
