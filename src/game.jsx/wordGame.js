import React, { Component } from "react";

class WordGame extends Component {
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

  handleEnterPress = (event) => {
    if (event.code === "Enter") {
      this.props.handleSubmit();
    }
  };

  render() {
    const {
      currentWord,
      score,
      userGuess,
      handleRulesClick,
      handleSynonymGameClick,
      handleSubmit,
      handleChange,
    } = this.props;

    return (
      <div className="vh-auto">
        <div
          className="container col-sm- m-5 bg-light d-flex flex-column mx-auto rounded-lg"
          style={{ height: "420px" }}
        >
          <div className="row ">
            <button
              className="col-6 d-flex justify-content-center text-center py-2 border bg-secondary text-white rounded-left"
              onClick={handleSynonymGameClick}
            >
              Word Association Game
            </button>
            <button
              className="col-6 d-flex justify-content-center text-center py-2 border bg-secondary text-white rounded-right"
              onClick={handleRulesClick}
            >
              Rules
            </button>
          </div>
          <div className="row justify-content-md-center p-5 mt-auto">
            <h1 className="text-capitalize display-4">{currentWord}</h1>
          </div>
          <div className="row justify-content-md-center align-items-center">
            <input
              type="text"
              className="form-control col-8 mx-1 focus"
              id="synonymGuess"
              placeholder="Synonym Guess"
              value={userGuess}
              onChange={(e) => handleChange(e)}
              onKeyPress={this.handleEnterPress}
            ></input>
            <button
              type="button"
              className="btn btn-primary col-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="row justify-content-between mt-auto p-3">
            <h4 className="col-4">Lives: {this.renderLives()}</h4>
            <h4 className="col-2">Score: {score}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default WordGame;
