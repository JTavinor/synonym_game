import React, { Component } from "react";
import axios from "axios";
import randomWords from "random-words";

// Need only single word: not phrase => split result and check if length of array === 1;
// Need word to have a synonym property

class Game extends Component {
  state = { word: "", synonyms: [], lives: 3, score: 0, guess: "" };

  async getNewWord() {
    const word = randomWords();
    const { data: synonyms } = await axios.get(
      `https://api.datamuse.com/words?ml=${word}`
    );
    this.setState({ word, synonyms });
    console.log(this.state);
  }

  componentDidMount() {
    this.getNewWord();
  }

  handleSubmit = async () => {
    this.getNewWord();
    const synonymArray = [];
    this.state.synonyms.forEach((e) => synonymArray.push(e.word));
    if (synonymArray.includes(this.state.guess)) {
      this.state.score += 1;
    } else {
      this.state.lives -= 1;
    }
    this.state.guess = "";
  };

  handleChange = (e) => {
    const guess = e.currentTarget.value;
    this.setState({ guess });
  };

  render() {
    return (
      <div class="jumbotron jumbotron-fluid mx-5 mt-5">
        <div class="container">
          <h1 class="display-4 d-flex justify-content-center row">
            {this.state.word}
          </h1>
          <label for="exampleInputEmail1">Synonym Guess</label>
          <div className="row justify-content-between mb-5">
            <input
              type="text"
              class="form-control col-10"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
            ></input>
            <button
              type="button"
              class="btn btn-primary col-2"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
          <div class="row align-items-end">
            <div class="col-sm">Lives: {this.state.lives}</div>
            <div class="col-sm">Score: {this.state.score}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
