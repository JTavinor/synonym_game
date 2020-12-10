import React, { Component } from "react";
import Leaderboard from "./common/leaderboard";
import {
  deleteWrongWord,
  getUserLeaderboard,
  getWrongWords,
} from "../services/httpservice";

class PersonalPage extends Component {
  state = {
    wrongWords: [],
    pageLength: 7,
    currentPage: 1,
    searchQuery: "",
    pageRange: [1, 5],
  };

  componentDidMount = async () => {
    const { data: userScores } = await getUserLeaderboard(this.props.user._id);
    const { data: wrongWords } = await getWrongWords(this.props.user._id);
    this.setState({ userScores, wrongWords: wrongWords.wrongWords });
    // console.log(this.state);
  };

  renderTableBody = () => {
    let { wrongWords, pageLength, currentPage, searchQuery } = this.state;

    wrongWords = wrongWords
      .filter((x) => x.word.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(pageLength * currentPage - pageLength, pageLength * currentPage);

    return wrongWords.map((element) => (
      <tr>
        <th scope="row">{element.word}</th>
        <td>{element.synonyms[0]}</td>
        <td>{element.synonyms[1]}</td>
        <td>{element.synonyms[2]}</td>
        <td key={"button"}>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => {
              deleteWrongWord(element, this.props.user._id);
              window.location.reload();
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    // console.log(this.state.wrongWords);
    // return null;
  };

  handleSearchQuery = (e) => {
    const searchQuery = e.currentTarget.value;
    this.setState({ searchQuery, currentPage: 1, pageRange: [1, 5] });
  };

  renderPaginationButtons() {
    let { wrongWords, searchQuery, pageLength } = this.state;

    wrongWords = wrongWords.filter((x) =>
      x.word.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pageSelectButtons = [];
    // for (let i = 1; i <= Math.ceil(wrongWords.length / pageLength); i++)
    const { pageRange } = this.state;

    if (pageRange[1] >= 6 && this.state.currentPage > 1) {
      pageSelectButtons.push(
        <button
          className="btn mx-1 btn-info"
          onClick={(e) => {
            e.preventDefault();
            this.setState({ currentPage: this.state.currentPage - 1 });
            pageRange[0] -= 1;
            pageRange[1] -= 1;
            this.setState({ pageRange });
          }}
        >
          {"<<"}
        </button>
      );
    }

    if (Math.ceil(wrongWords.length / pageLength) < pageRange[1]) {
      var topButtonNumber = Math.ceil(wrongWords.length / pageLength);
    } else {
      var topButtonNumber = pageRange[1];
    }
    for (
      let i = pageRange[0];
      // i <= Math.ceil(wrongWords.length / pageLength);
      i <= topButtonNumber;
      i++
    ) {
      if (Math.ceil(wrongWords.length / pageLength) === 1) return;
      let classes = "btn mx-1 btn-";
      classes += this.state.currentPage === i ? "success" : "primary";

      pageSelectButtons.push(
        <button
          className={classes}
          onClick={(e) => {
            e.preventDefault();
            this.setState({ currentPage: i });
          }}
        >
          {i}
        </button>
      );
    }

    if (
      pageRange[1] < Math.ceil(wrongWords.length / pageLength) &&
      this.state.currentPage < Math.ceil(wrongWords.length / pageLength)
    ) {
      pageSelectButtons.push(
        <button
          className="btn mx-1 btn-info"
          onClick={(e) => {
            e.preventDefault();
            this.setState({ currentPage: this.state.currentPage + 1 });
            pageRange[0] += 1;
            pageRange[1] += 1;
            this.setState({ pageRange });
          }}
        >
          {">>"}
        </button>
      );
    }

    return pageSelectButtons;
  }

  render() {
    const { userScores } = this.state;
    return (
      <div>
        {!userScores || userScores.length === 0 ? (
          <div></div>
        ) : (
          <Leaderboard
            data={userScores}
            searchbar={false}
            pagination={true}
            title={`${userScores[0].name}'s Scores`}
            sortable={true}
            deleteButton={true}
          />
        )}
        <div
          className="container col-sm- mt-5 mb-2 bg-light d-flex py-3 flex-column mx-auto"
          style={{ height: "auto" }}
        >
          <h1 className="row justify-content-center">
            Wrong Words - 3 Correct Examples
          </h1>
          <input
            type="text"
            className="form-control col-align-self-center col-8 mx-auto my-2"
            id="synonymGuess"
            aria-describedby="emailHelp"
            placeholder="Search Leaderboard..."
            onChange={(e) => this.handleSearchQuery(e)}
          ></input>
          <table class="table table-striped m-auto">
            <thead>
              <tr>
                <th scope="col">Wrong Word</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                <th scope="col" key="delete">
                  Delete Score
                </th>
              </tr>
            </thead>
            <tbody>{this.renderTableBody()}</tbody>
          </table>
          <ul className="list-group list-group-horizontal mt-2 row justify-content-center">
            {this.renderPaginationButtons()}
          </ul>
        </div>
      </div>
    );
  }
}

export default PersonalPage;
