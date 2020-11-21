import React, { Component } from "react";
import GameScreen from "./gameScreen";
import axios from "axios";
import randomWords from "random-words";
import GameOver from "./gameOver";
import RulesPage from "./rulesPage";

class Game extends Component {
  state = {
    word: "",
    synonyms: [],
    lives: 3,
    score: 0,
    guess: "",
    gamePage: true,
  };

  componentDidMount() {
    this.getNewWord();
  }

  handleSubmit = async () => {
    this.getNewWord();
    const synonymArray = [];
    this.state.synonyms.forEach((e) => synonymArray.push(e.word));
    if (synonymArray.includes(this.state.guess)) {
      const score = this.state.score + 1;
      this.setState({ score, guess: "" });
    } else {
      const lives = this.state.lives - 1;
      this.setState({ lives, guess: "" });
    }

    const element = document.getElementById("synonymGuess");
    element.focus();
  };

  async getNewWord() {
    const word = randomWords();
    const { data: synonyms } = await axios.get(
      `https://api.datamuse.com/words?ml=${word}`
    );
    this.setState({ word, synonyms });
  }

  handleChange = (e) => {
    const guess = e.currentTarget.value;
    this.setState({ guess });
  };

  handlePlayAgain = () => {
    const lives = 3;
    const score = 0;
    this.setState({ lives, score });
  };

  handleSynonymGameClick() {
    const gamePage = true;
    this.setState({ gamePage });
    console.log("game clicked");
  }

  handleRulesClick() {
    const gamePage = false;
    this.setState({ gamePage });
    console.log("rules clicked");
  }

  render() {
    const { lives, word, score, guess } = this.state;
    if (lives === 0) {
      return <GameOver score={score} handlePlayAgain={this.handlePlayAgain} />;
    }
    return (
      <div className="vh-100">
        <div
          className="container col-sm- m-5 bg-light d-flex flex-column mx-auto"
          style={{ height: "420px" }}
        >
          <div className="row">
            <button
              class="col-6 d-flex justify-content-center text-center py-2 border bg-secondary text-white"
              onClick={() => this.handleSynonymGameClick()}
            >
              Synonym Game
            </button>
            <button
              class="col-6 d-flex justify-content-center text-center py-2 border bg-secondary text-white"
              onClick={() => this.handleRulesClick()}
            >
              Rules
            </button>
          </div>
          {this.state.gamePage && (
            <GameScreen
              lives={lives}
              word={word}
              score={score}
              guess={guess}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleSynonymGameClick={this.handleSynonymGameClick}
              handleRulesClick={this.handleRulesClick}
            />
          )}
          {!this.state.gamePage && (
            <RulesPage
              handleRulesClick={this.handleRulesClick}
              handleSynonymGameClick={this.handleSynonymGameClick}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Game;
