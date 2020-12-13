import React, { Component } from "react";
import getRandomWord from "random-words";
import {
  getLeaderboard,
  postAnonScore,
  postUserScore,
} from "../../services/leaderboardServices";
import { getWordData } from "../../services/wordServices";
import { addWrongWordToDb } from "../../services/userServices";
import GameScreen from "./gameScreen";
import RulesPage from "./rulesScreen";
import GameOver from "./gameOverScreen";
import Header from "../common/header";

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
      const { timer, gameStarted, score } = this.state;
      if (timer > 0) {
        this.setState(({ timer }) => ({
          timer: timer - 1,
        }));
      }
      if (timer === 0 || !gameStarted) {
        clearInterval(this.myInterval);
        this.handleGameOver(true, score);
      }
    }, 1000);
  };

  handleSubmitGuess = () => {
    let { synonyms, userGuess, score, lives, currentWord } = this.state;
    const { user } = this.props;

    if (synonyms.includes(userGuess.toLowerCase())) {
      score += 1;
      this.setState({ score, userGuess: "" });
    } else {
      lives -= 1;
      this.setState({ lives, userGuess: "" });

      if (user) {
        addWrongWordToDb(currentWord, synonyms, user._id);
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
            <Header
              titleOne={"Word Association Game"}
              titleTwo={"Rules"}
              handleTabOne={this.handleGameTab}
              handleTabTwo={this.handleRulesTab}
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
