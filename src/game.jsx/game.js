import React, { Component } from "react";
import axios from "axios";
import randomWords from "random-words";
import GameScreen from "./gameScreen";
import GameOver from "./gameOver";
import RulesPage from "./rulesPage";
import Leaderboard from "./leaderboard";

class Game extends Component {
  state = {
    currentWord: "",
    synonyms: [],
    lives: 3,
    score: 0,
    userGuess: "",
    gamePage: true,
  };

  async getNewWord() {
    const newWord = randomWords();
    const { data: synonymArray } = await axios.get(
      `https://api.datamuse.com/words?ml=${newWord}`
    );

    const synonyms = [];
    synonymArray.forEach((e) => synonyms.push(e.word));

    this.setState({ currentWord: newWord, synonyms });
  }

  componentDidMount() {
    this.getNewWord();
  }

  handleSubmitGuess = () => {
    let { synonyms, userGuess, score, lives } = this.state;

    if (synonyms.includes(userGuess)) {
      score += 1;
      this.setState({ score, userGuess: "" });
    } else {
      lives -= 1;
      this.setState({ lives, userGuess: "" });
    }

    this.getNewWord();

    const inputField = document.getElementById("synonymGuess");
    inputField.focus();
  };

  handleChange = (e) => {
    const userGuess = e.currentTarget.value;
    this.setState({ userGuess });
  };

  handleSynonymGameTab = () => {
    const gamePage = true;
    this.setState({ gamePage });
  };

  handleRulesTab = () => {
    const gamePage = false;
    this.setState({ gamePage });
  };

  handlePlayAgain = async (name, points) => {
    if (this.props.user) {
      await axios.post("http://localhost:5000/leaderboard", {
        userId: this.props.user._id,
        score: points,
      });
    } else if (!this.props.user) {
      await axios.post("http://localhost:5000/leaderboard", {
        name: name || "unknown",
        score: points,
      });
    }

    const lives = 3;
    const score = 0;
    this.setState({ lives, score });
  };

  render() {
    const { lives, currentWord, score, userGuess } = this.state;
    if (lives === 0) {
      return (
        <div>
          <GameOver
            score={score}
            handlePlayAgain={this.handlePlayAgain}
            user={this.props.user}
          />{" "}
          <Leaderboard apiRoute={"http://localhost:5000/leaderboard"} />
        </div>
      );
    }
    return (
      <React.Fragment>
        {this.state.gamePage && (
          <GameScreen
            lives={lives}
            currentWord={currentWord}
            score={score}
            userGuess={userGuess}
            handleSubmit={this.handleSubmitGuess}
            handleChange={this.handleChange}
            handleSynonymGameClick={this.handleSynonymGameTab}
            handleRulesClick={this.handleRulesTab}
          />
        )}
        {!this.state.gamePage && (
          <RulesPage
            handleSynonymGameClick={this.handleSynonymGameTab}
            handleRulesClick={this.handleRulesTab}
          />
        )}
        <Leaderboard apiRoute={"http://localhost:5000/leaderboard"} />
      </React.Fragment>
    );
  }
}

export default Game;
