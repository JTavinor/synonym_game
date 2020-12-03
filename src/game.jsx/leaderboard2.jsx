import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

class Leaderboard2 extends Component {
  // componentWillReceiveProps(nextProps) {
  //   if (this.state.dataArray.length !== nextProps.data.length) {
  //     this.setState({ data: nextProps.data });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.data.length !== prevProps.data.length) {
  //     this.setState({ data: this.props.data });
  //   }
  // }

  constructor(props) {
    super(props);
    const {
      data: dataArray,
      searchbar,
      pagination,
      title,
      sortIcon,
    } = this.props;

    // Data is ordered on backend, so just need to iterate through data and add a ranking number
    for (let i = 0; i < dataArray.length; i++) {
      dataArray[i].rank = i + 1;
      dataArray[i].date = dataArray[i].date.slice(0, 10);
    }

    this.state = {
      dataArray,
      searchbar,
      pagination,
      title,
      columns: {},
      searchQuery: "",
      currentPage: 1,
      sortIcon,
    };
  }

  handleSearchQuery = (e) => {
    const searchQuery = e.currentTarget.value;
    this.setState({ searchQuery, currentPage: 1 });
  };

  handleSearchBarSelect() {
    this.setState({ currentColumn: "" });
  }

  handlePageSelect(i) {
    this.setState({ currentPage: i });
  }

  handleFilterTable(currentColumn) {
    if (this.state.sortIcon === false) return;

    let { dataArray, columns } = this.state;
    if (!columns[currentColumn]) {
      let filtered = _.orderBy(dataArray, [currentColumn], ["asc"]);
      columns[currentColumn] = true;
      this.setState({ dataArray: filtered, columns });
    } else {
      let filtered = _.orderBy(dataArray, [currentColumn], ["desc"]);
      columns[currentColumn] = false;
      this.setState({ dataArray: filtered, columns });
    }
    this.setState({ currentColumn });
  }

  renderPaginationButtons() {
    let { dataArray, searchQuery } = this.state;

    dataArray = dataArray.filter((x) =>
      x.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pageSelectButtons = [];
    for (let i = 1; i <= Math.ceil(dataArray.length / 5); i++) {
      if (Math.ceil(dataArray.length / 5) === 1) return;
      pageSelectButtons.push(
        <button
          className="btn btn-primary mx-1"
          onClick={() => this.handlePageSelect(i)}
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

  renderTable() {
    let { dataArray, searchQuery, currentPage } = this.state;

    dataArray = dataArray
      .filter((x) => x.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(5 * currentPage - 5, 5 * currentPage);

    return dataArray.map((currentRow) => (
      <tr key={dataArray.indexOf(currentRow) + 1}>
        <th scope="col">{currentRow.rank}</th>

        <th scope="col">
          {/* If player is a registered user, link to their stats page */}
          {(currentRow.user._id && (
            <Link to={`/users/${currentRow.user._id}`}>{currentRow.name}</Link>
          )) ||
            currentRow.name}
        </th>
        <th scope="col">{currentRow.score}</th>
        <th scope="col">{currentRow.date}</th>
      </tr>
    ));
  }

  render() {
    // console.log("X");
    return (
      <div
        className="container col-sm- mt-5 mb-2 bg-light d-flex py-3 flex-column mx-auto"
        style={{ height: "auto" }}
      >
        <h1 className="row mx-auto mb-3">{this.state.title}</h1>
        <div className="row justify-content-md-center m-auto"></div>
        {this.state.searchbar && (
          <input
            type="text"
            className="form-control col-align-self-center col-8 mx-auto my-2"
            id="synonymGuess"
            aria-describedby="emailHelp"
            placeholder="Search Leaderboard..."
            onChange={(e) => this.handleSearchQuery(e)}
            onSelect={() => this.handleSearchBarSelect()}
          ></input>
        )}
        <table className="table table-striped m-auto">
          <thead>
            <tr>
              <th scope="col" onClick={() => this.handleFilterTable("rank")}>
                Rank
                {this.state.sortIcon && this.renderSortIcon("rank")}
              </th>
              <th scope="col" onClick={() => this.handleFilterTable("name")}>
                Name
                {this.state.sortIcon && this.renderSortIcon("name")}
              </th>
              <th scope="col" onClick={() => this.handleFilterTable("score")}>
                Score
                {this.state.sortIcon && this.renderSortIcon("score")}
              </th>
              <th scope="col" onClick={() => this.handleFilterTable("date")}>
                Date
                {this.state.sortIcon && this.renderSortIcon("date")}
              </th>
            </tr>
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

export default Leaderboard2;
