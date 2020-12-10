import React, { Component } from "react";
import getRandomWord from "random-words";

import {
  addWrongWord,
  getLeaderboard,
  getWordData,
  postAnonScore,
  postUserScore,
} from "../../services/httpservice";
import GameScreen from "./gameScreen";
import RulesPage from "./rulesPage";
import GameHeader from "./gameHeader";
import GameOver from "./gameOver";

class GameContainer extends Component {
  state = {
    currentWord: "",
    synonyms: [],
    lives: 3,
    score: 0,
    userGuess: "",
    gamePageSelected: true,
    timer: 90,
    gameOver: false,
    gameStarted: false,
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.getNewWord();
  };

  async getNewWord() {
    const newWord = getRandomWord();
    const { data: synonymArray } = await getWordData(newWord);

    const synonyms = [];
    synonymArray.forEach((entry) => synonyms.push(entry.word));

    this.setState({ currentWord: newWord, synonyms });
  }

  componentWillUnmount = () => {
    this._isMounted = false;
    this.setState = (state, callback) => {
      return;
    };
  };

  handleGameTab = () => {
    const gamePageSelected = true;
    this.setState({ gamePageSelected });
  };

  handleRulesTab = () => {
    const gamePageSelected = false;
    this.setState({ gamePageSelected });
  };

  startTimer = () => {
    this.setState({ gameStarted: true });
    this.myInterval = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState(({ timer }) => ({
          timer: timer - 1,
        }));
      }
      if (timer === 0 || !this.state.gameStarted) {
        clearInterval(this.myInterval);
        this.handleGameOver(true, this.state.score);
      }
    }, 1000);
  };

  handleSubmitGuess = () => {
    let { synonyms, userGuess, score, lives } = this.state;

    if (synonyms.includes(userGuess)) {
      score += 1;
      this.setState({ score, userGuess: "" });
    } else {
      lives -= 1;
      this.setState({ lives, userGuess: "" });

      if (this.props.user) {
        const wrongWord = {};
        wrongWord.word = this.state.currentWord;
        const filtered = synonyms.filter((synonym) => synonym.indexOf(" ") < 0);
        wrongWord.synonyms = filtered.slice(0, 3);
        console.log(wrongWord.synonyms);
        addWrongWord(wrongWord, this.props.user._id);
      }
    }

    if (lives === 0) {
      return this.handleGameOver(true, score);
    }

    this.getNewWord();

    const inputField = document.getElementById("synonymGuess");
    inputField.focus();
  };

  handleInputChange = (e) => {
    const userGuess = e.currentTarget.value;
    this.setState({ userGuess });
  };

  handleGameOver = (gameOver, score) => {
    this.setState({ gameOver, score, gameStarted: false });
  };

  handlePlayAgain = async (name, finalScore, submitScore) => {
    if (submitScore) {
      const { user } = this.props;
      if (user) {
        postUserScore(user._id, finalScore);
      } else if (!user) {
        postAnonScore(name, finalScore);
      }
    }

    const lives = 3;
    const score = 0;
    const timer = 90;

    const { data } = await getLeaderboard();
    this.setState({ data });

    this.props.refreshLeaderboard();

    this.getNewWord();

    this.setState({ lives, score, gameOver: false, timer });
  };

  render() {
    return (
      <div className="vh-auto">
        <div
          className="container col-sm- m-5 bg-light d-flex flex-column mx-auto rounded-lg"
          style={{ height: "420px" }}
        >
          {!this.state.gameOver && (
            <GameHeader
              handleGameTab={this.handleGameTab}
              handleRulesTab={this.handleRulesTab}
            />
          )}
          {!this.state.gameOver &&
            ((this.state.gamePageSelected && (
              <GameScreen
                currentWord={this.state.currentWord}
                timer={this.state.timer}
                handleInputChange={this.handleInputChange}
                handleSubmitGuess={this.handleSubmitGuess}
                lives={this.state.lives}
                startTimer={this.startTimer}
                userGuess={this.state.userGuess}
                score={this.state.score}
                gameStarted={this.state.gameStarted}
              />
            )) || <RulesPage />)}

          {this.state.gameOver && (
            <GameOver
              score={this.state.score}
              handlePlayAgain={this.handlePlayAgain}
              userLoggedIn={this.props.user}
              data={this.props.data}
            />
          )}
        </div>
      </div>
    );
  }
}

export default GameContainer;
