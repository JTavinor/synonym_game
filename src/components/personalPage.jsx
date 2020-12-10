import React from "react";
import Leaderboard from "./common/leaderboard";
import {
  deleteWrongWord,
  getUserLeaderboard,
  getWrongWords,
} from "../services/httpservice";
import Table from "./common/table";

class PersonalPage extends Table {
  state = {
    wrongWords: [],
    pageLength: 7,
    currentPage: 1,
    searchQuery: "",
    pageRange: [1, 5],
    deleteButton: true,
    sortable: false,
  };

  componentDidMount = async () => {
    const { data: userScores } = await getUserLeaderboard(this.props.user._id);
    const { data: wrongWords } = await getWrongWords(this.props.user._id);
    this.setState({ userScores, wrongWords: wrongWords.wrongWords });
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
  };

  render() {
    const {
      wrongWords,
      searchQuery,
      pageLength,
      pageRange,
      currentPage,
      userScores,
    } = this.state;
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
          <h1 className="row justify-content-center">Wrong Words</h1>
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
                {this.renderTableHeader([
                  "Wrong Word",
                  "Example1",
                  "Example2",
                  "Example3",
                ])}
              </tr>
            </thead>
            <tbody>{this.renderTableBody()}</tbody>
          </table>
          <ul className="list-group list-group-horizontal mt-2 row justify-content-center">
            {this.renderPaginationButtons(
              wrongWords,
              searchQuery,
              pageLength,
              pageRange,
              currentPage,
              "word"
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default PersonalPage;
