import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { deleteScore } from "../../services/httpservice";
import Table from "./table";

class Leaderboard extends Table {
  constructor(props) {
    super(props);
    const {
      data: data,
      searchbar,
      pagination,
      title,
      sortable,
      deleteButton,
    } = this.props;

    // Data is ordered on backend, so just need to iterate through data and add a ranking number
    for (let i = 0; i < data.length; i++) {
      data[i].rank = i + 1;
      // data[i].date = data[i].date.slice(0, 10);
    }

    // let pageLength = 0;
    // if (data.length <= 25) {
    //   pageLength = 5;
    // } else pageLength = Math.ceil(data.length / 5);

    this.state = {
      data,
      searchbar,
      pagination,
      title,
      columns: { rank: true },
      currentColumn: "rank",
      searchQuery: "",
      currentPage: 1,
      sortable,
      pageLength: this.props.pageLength || 10,
      deleteButton,
      pageRange: [1, 5],
    };
  }

  componentDidMount = () => {
    this.renderSortIcon("rank");
  };

  renderTable = () => {
    let { data, searchQuery, currentPage, pageLength } = this.state;

    data = data
      .filter((x) => x.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(pageLength * currentPage - pageLength, pageLength * currentPage);

    return data.map((currentRow) => (
      <tr key={data.indexOf(currentRow) + 1}>
        <th scope="col" key={"rank" + currentRow._id}>
          {currentRow.rank}
        </th>

        <td key={currentRow.name + currentRow._id}>
          {/* If player is a registered user, link to their stats page */}
          {(currentRow.user._id &&
            window.location.pathname !== `/users/${currentRow.user._id}` &&
            window.location.pathname !== `/userpage` && (
              <Link to={`/users/${currentRow.user._id}`}>
                {currentRow.name}
              </Link>
            )) ||
            currentRow.name}
        </td>
        <td key={currentRow.score + currentRow._id}>{currentRow.score}</td>
        <td key={currentRow.date + currentRow._id}>{currentRow.date}</td>
        {this.state.deleteButton && (
          <td key={"button" + currentRow._id}>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => {
                deleteScore(currentRow._id);
                this.props.refreshLeaderboard();
                window.location.reload();
              }}
            >
              Delete
            </button>
          </td>
        )}
      </tr>
    ));
  };

  render() {
    const {
      data,
      searchQuery,
      pageLength,
      pageRange,
      currentPage,
    } = this.state;
    return (
      <div
        className="container col-sm- mt-5 mb-2 bg-light d-flex py-3 flex-column mx-auto"
        style={{ height: "auto" }}
      >
        <h1 className="row mx-auto mb-3">{this.state.title}</h1>
        {this.state.searchbar && (
          <input
            type="text"
            className="form-control col-align-self-center col-8 mx-auto my-2"
            id="synonymGuess"
            aria-describedby="emailHelp"
            placeholder="Search Leaderboard..."
            onChange={(e) => this.handleSearchQuery(e)}
          ></input>
        )}
        <table className="table table-striped m-auto">
          <thead>
            <tr>{this.renderTableHeader(["rank", "name", "score", "date"])}</tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
        {this.state.pagination && (
          <ul className="list-group list-group-horizontal mt-2 row justify-content-center">
            {this.renderPaginationButtons(
              data,
              searchQuery,
              pageLength,
              pageRange,
              currentPage,
              "name"
            )}
          </ul>
        )}
      </div>
    );
  }
}

export default Leaderboard;
