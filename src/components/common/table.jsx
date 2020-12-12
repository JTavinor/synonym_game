import React, { Component } from "react";
import _ from "lodash";

class Table extends Component {
  state = {};

  // Filters table data by the search query
  filterData() {
    const { filterColumn, data, searchQuery } = this.state;
    return data.filter((row) =>
      row[filterColumn].toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  directionButtonPush = (direction) => {
    const { currentPage, pageRange } = this.state;

    if (direction === "<<") {
      // Prevents lowerPageNumber going below 1
      this.setState({ currentPage: currentPage - 1 });
      if (pageRange.lowerPageNumber > 1) {
        pageRange.lowerPageNumber -= 1;
        pageRange.upperPageNumber -= 1;
      }
    } else {
      this.setState({ currentPage: currentPage + 1 });
      pageRange.lowerPageNumber += 1;
      pageRange.upperPageNumber += 1;
    }
    this.setState({ pageRange });
  };

  renderDirectionalButton = (direction) => {
    return (
      <button
        className="btn mx-1 btn-info"
        key={direction}
        onClick={() => this.directionButtonPush(direction)}
      >
        {direction}
      </button>
    );
  };

  renderPaginationButtons() {
    let { data, pageLength, pageRange, currentPage } = this.state;
    // Filter table data based on searchQuery
    data = this.filterData();

    const paginationButtons = [];
    const totalPages = Math.ceil(data.length / pageLength);
    const lowerPageNumber = pageRange.lowerPageNumber;
    const upperPageNumber = pageRange.upperPageNumber;

    // Only render Back button if not on first page
    if (currentPage > 1) {
      paginationButtons.push(this.renderDirectionalButton("<<"));
    }

    // Ensures no 'empty' pages for small sets of table data
    if (totalPages < upperPageNumber) {
      var topButtonNumber = totalPages;
    } else {
      topButtonNumber = upperPageNumber;
    }

    for (let i = lowerPageNumber; i <= topButtonNumber; i++) {
      if (totalPages === 1) return;
      let classes = "btn mx-1 btn-";
      classes += currentPage === i ? "success" : "primary";

      paginationButtons.push(
        <button
          key={i}
          className={classes}
          onClick={() => {
            this.setState({ currentPage: i });
          }}
        >
          {i}
        </button>
      );
    }

    // Only render Forward button if there is more than 5 pages of data and if not on last page
    if (upperPageNumber < totalPages && currentPage < totalPages) {
      paginationButtons.push(this.renderDirectionalButton(">>"));
    }

    return paginationButtons;
  }

  handleSearchQuery = (e) => {
    const searchQuery = e.currentTarget.value;
    this.setState({ searchQuery, currentPage: 1 });
  };

  handleSortColumns(currentColumn) {
    let { data, columns, sortable } = this.state;

    if (sortable === false) return;

    if (!columns[currentColumn]) {
      let sortedTable = _.orderBy(data, [currentColumn], ["asc"]);
      columns[currentColumn] = true;
      this.setState({ data: sortedTable, columns });
    } else {
      let sortedTable = _.orderBy(data, [currentColumn], ["desc"]);
      columns[currentColumn] = false;
      this.setState({ data: sortedTable, columns });
    }
    this.setState({ currentColumn });
  }

  renderSortIcon(colName) {
    const { currentColumn, columns } = this.state;
    if (currentColumn !== colName) return null;
    if (columns[colName]) {
      return <i className="fa fa-sort-asc"></i>;
    }
    return <i className="fa fa-sort-desc"></i>;
  }

  renderTableHeader() {
    const { headers, deleteButton, sortable } = this.state;
    const tableHeader = [];
    headers.forEach((header) => {
      tableHeader.push(
        <th
          scope="col"
          onClick={() => this.handleSortColumns(header)}
          key={header}
        >
          {_.capitalize(header)}
          {sortable && this.renderSortIcon(header)}
        </th>
      );
    });
    if (deleteButton)
      tableHeader.push(
        <th scope="col" key="delete">
          Delete
        </th>
      );
    return tableHeader;
  }

  renderTable = () => {
    const { title, pagination, searchBar } = this.state;
    return (
      <div
        className="container col-sm- mt-5 mb-2 bg-light d-flex py-3 flex-column mx-auto"
        style={{ height: "auto" }}
      >
        <h1 className="row justify-content-center">{title}</h1>
        {searchBar && (
          <input
            type="text"
            className="form-control col-align-self-center col-8 mx-auto my-2"
            id={title + "search"}
            placeholder="Search Leaderboard..."
            onChange={(e) => this.handleSearchQuery(e)}
          ></input>
        )}
        <table className="table table-striped m-auto">
          <thead>
            <tr>{this.renderTableHeader()}</tr>
          </thead>
          <tbody>{this.renderTableBody()}</tbody>
        </table>
        {pagination && (
          <ul className="list-group list-group-horizontal mt-2 row justify-content-center">
            {this.renderPaginationButtons()}
          </ul>
        )}
      </div>
    );
  };

  render() {
    return null;
  }
}

export default Table;
