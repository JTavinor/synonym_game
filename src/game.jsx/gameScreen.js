import React, { Component } from "react";
import axios from "axios";
import randomWords from "random-words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// Heart ICON
// <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />

class GameScreen extends Component {
  renderLives = () => {
    const hearts = [];
    for (let i = 1; i <= this.props.lives; i++) {
      hearts.push(
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: "red" }}
          className="px-1"
        />
      );
    }
    return hearts;
  };

  render() {
    const { lives, word, score, guess } = this.props;

    return (
      <React.Fragment>
        <div className="row justify-content-md-center p-5 mt-auto">
          <h1 className="text-capitalize display-4">{word}</h1>
        </div>
        <div className="row justify-content-md-center align-items-center">
          <input
            type="text"
            class="form-control col-8 mx-1 focus"
            id="synonymGuess"
            aria-describedby="emailHelp"
            placeholder="Synonym Guess"
            value={guess}
            onChange={(e) => this.props.handleChange(e)}
          ></input>
          <button
            type="button"
            class="btn btn-primary col-2"
            onClick={() => this.props.handleSubmit()}
          >
            Submit
          </button>
        </div>
        <div className="row justify-content-between mt-auto p-3">
          <h4 class="col-4">Lives: {this.renderLives()}</h4>
          <h4 class="col-2">Score: {score}</h4>
        </div>
      </React.Fragment>
    );
  }
}

export default GameScreen;
