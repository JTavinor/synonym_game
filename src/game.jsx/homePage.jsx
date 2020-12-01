import React, { Component } from "react";
import getRandomWord from "random-words";
import Game from "./gameScreen";
import GameOver from "./gameOver";
import RulesPage from "./rulesPage";
import Leaderboard2 from "./leaderboard2";
import {
  getLeaderboard,
  getWordData,
  postAnonScore,
  postUserScore,
} from "../services/httpservice";

class HomePage extends Component {
  state = {
    currentWord: "",
    synonyms: [],
    lives: 3,
    score: 0,
    userGuess: "",
    gamePageSelected: true,
  };

  async componentDidMount() {
    const { data } = await getLeaderboard();
    this.setState({ data });
    this.getNewWord();
  }

  // async componentDidUpdate() {
  //   const { data } = await getLeaderboard();
  //   this.setState({ data });
  // }

  async getNewWord() {
    const newWord = getRandomWord();
    const { data: synonymArray } = await getWordData(newWord);

    const synonyms = [];
    synonymArray.forEach((entry) => synonyms.push(entry.word));

    this.setState({ currentWord: newWord, synonyms });
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

  handleInputChange = (e) => {
    const userGuess = e.currentTarget.value;
    this.setState({ userGuess });
  };

  handleGameTab = () => {
    const gamePageSelected = true;
    this.setState({ gamePageSelected });
  };

  handleRulesTab = () => {
    const gamePageSelected = false;
    this.setState({ gamePageSelected });
  };

  handlePlayAgain = async (name, finalScore) => {
    const { user } = this.props;
    if (user) {
      postUserScore(user._id, finalScore);
    } else if (!user) {
      postAnonScore(name, finalScore);
    }

    const lives = 3;
    const score = 0;

    const { data } = await getLeaderboard();
    this.setState({ data });

    this.setState({ lives, score });
  };

  render() {
    console.log("Y");
    const { lives, currentWord, score, userGuess } = this.state;
    if (lives === 0) {
      return (
        <div>
          <GameOver
            score={score}
            handlePlayAgain={this.handlePlayAgain}
            user={this.props.user}
          />{" "}
          <Leaderboard2
            data={this.state.data}
            searchbar={false}
            pagination={false}
            title={"Top 5 scores"}
          />
        </div>
      );
    }
    return (
      <React.Fragment>
        {this.state.gamePageSelected && (
          <Game
            lives={lives}
            currentWord={currentWord}
            score={score}
            userGuess={userGuess}
            handleSubmit={this.handleSubmitGuess}
            handleChange={this.handleInputChange}
            handleSynonymGameClick={this.handleGameTab}
            handleRulesClick={this.handleRulesTab}
          />
        )}
        {!this.state.gamePageSelected && (
          <RulesPage
            handleSynonymGameClick={this.handleGameTab}
            handleRulesClick={this.handleRulesTab}
          />
        )}

        {!this.state.data ? (
          <div></div>
        ) : (
          <Leaderboard2
            data={this.state.data}
            searchbar={false}
            pagination={false}
            title={"Top 5 scores"}
            key={this.state.data.length}
          />
        )}
      </React.Fragment>
    );
  }
}

export default HomePage;
