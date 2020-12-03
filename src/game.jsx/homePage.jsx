import React, { Component } from "react";
import getRandomWord from "random-words";
import WordGame from "./wordGame";
import GameOver from "./gameOver";
import RulesPage from "./rulesPage";
import Leaderboard from "../common/leaderboard";
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

  renderGame = () => {
    const { lives, currentWord, score, userGuess } = this.state;

    return (
      <React.Fragment>
        {(this.state.gamePageSelected && (
          <WordGame
            lives={lives}
            currentWord={currentWord}
            score={score}
            userGuess={userGuess}
            handleSubmit={this.handleSubmitGuess}
            handleChange={this.handleInputChange}
            handleSynonymGameClick={this.handleGameTab}
            handleRulesClick={this.handleRulesTab}
          />
        )) || (
          <RulesPage
            handleSynonymGameClick={this.handleGameTab}
            handleRulesClick={this.handleRulesTab}
          />
        )}
      </React.Fragment>
    );
  };

  renderGameOver = () => {
    const { score } = this.state;

    return (
      <div>
        <GameOver
          score={score}
          handlePlayAgain={this.handlePlayAgain}
          userLoggedIn={this.props.user}
        />
      </div>
    );
  };

  render() {
    console.log(this.state.synonyms);
    const { lives, data } = this.state;
    return (
      <React.Fragment>
        {(lives !== 0 && this.renderGame()) || this.renderGameOver()}
        {!this.state.data ? (
          <div></div>
        ) : (
          <Leaderboard
            data={data}
            searchbar={false}
            pagination={false}
            title={"Top 5 scores"}
            key={data.length}
            sortable={false}
            pageLength={5}
          />
        )}
      </React.Fragment>
    );
  }
}

export default HomePage;
