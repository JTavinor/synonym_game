import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { deleteScore } from "../../services/httpservice";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    const {
      data: leaderboardData,
      searchbar,
      pagination,
      title,
      sortable,
      deleteButton,
    } = this.props;

    // Data is ordered on backend, so just need to iterate through data and add a ranking number
    for (let i = 0; i < leaderboardData.length; i++) {
      leaderboardData[i].rank = i + 1;
      // leaderboardData[i].date = leaderboardData[i].date.slice(0, 10);
    }

    let pageLength = 0;
    if (leaderboardData.length <= 25) {
      pageLength = 5;
    } else pageLength = leaderboardData.length / 5;

    this.state = {
      leaderboardData,
      searchbar,
      pagination,
      title,
      columns: { rank: true },
      currentColumn: "rank",
      searchQuery: "",
      currentPage: 1,
      sortable,
      pageLength: this.props.pageLength || pageLength,
      deleteButton,
    };
  }

  componentDidMount = () => {
    this.renderSortIcon("rank");
  };

  handleSearchQuery = (e) => {
    const searchQuery = e.currentTarget.value;
    this.setState({ searchQuery, currentPage: 1 });
  };

  handleSortColumns(currentColumn) {
    let { leaderboardData, columns, sortable } = this.state;

    if (sortable === false) return;

    if (!columns[currentColumn]) {
      let sortedTable = _.orderBy(leaderboardData, [currentColumn], ["asc"]);
      columns[currentColumn] = true;
      this.setState({ leaderboardData: sortedTable, columns });
    } else {
      let sortedTable = _.orderBy(leaderboardData, [currentColumn], ["desc"]);
      columns[currentColumn] = false;
      this.setState({ leaderboardData: sortedTable, columns });
    }
    this.setState({ currentColumn });
  }

  renderPaginationButtons() {
    let { leaderboardData, searchQuery, pageLength } = this.state;

    leaderboardData = leaderboardData.filter((row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pageSelectButtons = [];
    for (let i = 1; i <= Math.ceil(leaderboardData.length / pageLength); i++) {
      if (Math.ceil(leaderboardData.length / pageLength) === 1) return;
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
    return pageSelectButtons;
  }

  renderSortIcon(colName) {
    const { currentColumn, columns } = this.state;
    if (currentColumn !== colName) return null;
    if (columns[colName]) {
      return <i className="fa fa-sort-asc"></i>;
    }
    return <i className="fa fa-sort-desc"></i>;
  }

  renderTableHeader(headers) {
    const tableHeader = [];
    const width = { rank: "15%", name: "20%", score: "15%", date: "20%" };
    headers.forEach((header) => {
      tableHeader.push(
        <th
          scope="col"
          style={{ width: width[header] }}
          onClick={() => this.handleSortColumns(header)}
          key={header}
        >
          {_.capitalize(header)}
          {this.state.sortable && this.renderSortIcon(header)}
        </th>
      );
    });
    if (this.state.deleteButton)
      tableHeader.push(
        <th scope="col" key="delete">
          Delete Score
        </th>
      );
    return tableHeader;
  }

  renderTable() {
    let { leaderboardData, searchQuery, currentPage, pageLength } = this.state;

    leaderboardData = leaderboardData
      .filter((x) => x.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(pageLength * currentPage - pageLength, pageLength * currentPage);

    return leaderboardData.map((currentRow) => (
      <tr key={leaderboardData.indexOf(currentRow) + 1}>
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
                window.location.reload();
              }}
            >
              Delete
            </button>
          </td>
        )}
      </tr>
    ));
  }

  render() {
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
          <ul className="list-group list-group-horizontal mt-2 row justify-content-md-center">
            {this.renderPaginationButtons()}
          </ul>
        )}
      </div>
    );
  }
}

export default Leaderboard;
