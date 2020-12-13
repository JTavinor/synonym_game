import React from "react";
import { Link } from "react-router-dom";
import { deleteScore } from "../../services/leaderboardServices";
import Table from "../common/table";

class Leaderboard extends Table {
  state = {
    columns: { rank: true },
    currentColumn: "rank",
    searchQuery: "",
    currentPage: 1,
    pageLength: this.props.pageLength || 10,
    pageRange: { lowerPageNumber: 1, upperPageNumber: 5 },
    headers: ["rank", "name", "score", "date"],
    filterColumn: "name",
  };

  componentDidMount = () => {
    const {
      data,
      searchBar,
      pagination,
      title,
      sortable,
      deleteButton,
    } = this.props;

    // Adds rank property to leaderboard
    for (let i = 0; i < data.length; i++) {
      data[i].rank = i + 1;
    }

    this.setState({
      data,
      searchBar,
      pagination,
      title,
      sortable,
      deleteButton,
    });
  };

  renderTableBody = () => {
    let { data, currentPage, pageLength } = this.state;

    // Filters data by serachquery and currently selected page
    data = this.filterData().slice(
      pageLength * currentPage - pageLength,
      pageLength * currentPage
    );

    return data.map((currentRow) => (
      <tr key={data.indexOf(currentRow) + 1}>
        <th scope="col" key={"rank" + currentRow._id}>
          {currentRow.rank}
        </th>

        <td key={currentRow.name + currentRow._id}>
          {/* If player is a registered user & we are not on their page link to their stats page */}
          {(currentRow.user._id &&
            window.location.pathname !== `/users/${currentRow.user._id}` &&
            window.location.pathname !== `/personalPage` && (
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
    return (
      <React.Fragment>
        {this.state.data && <div>{this.renderTable()}</div>}
      </React.Fragment>
    );
  }
}

export default Leaderboard;
