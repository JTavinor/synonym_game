import React, { Component } from "react";
import _ from "lodash";

class Table extends Component {
  state = {};

  filterData(filteredColumn, data, searchQuery) {
    return data.filter((row) =>
      row[filteredColumn].toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  handleDirectionPush = (direction) => {
    const { currentPage, pageRange } = this.state;

    if (direction === "<<") {
      this.setState({ currentPage: currentPage - 1 });
      if (pageRange[0] > 1) {
        pageRange[0] -= 1;
        pageRange[1] -= 1;
      }
    } else {
      this.setState({ currentPage: currentPage + 1 });
      pageRange[0] += 1;
      pageRange[1] += 1;
    }
    this.setState({ pageRange });
  };

  renderDirectionalButton = (direction) => {
    return (
      <button
        className="btn mx-1 btn-info"
        key={direction}
        onClick={() => this.handleDirectionPush(direction)}
      >
        {direction}
      </button>
    );
  };

  renderPaginationButtons(
    data,
    searchQuery,
    pageLength,
    pageRange,
    currentPage,
    filterColumn
  ) {
    // Filter table based on searchQuery
    data = this.filterData(filterColumn, data, searchQuery);

    const paginationButtons = [];
    const totalPages = Math.ceil(data.length / pageLength);
    const bottomPageNumber = pageRange[0];
    const topPageNumber = pageRange[1];

    // Only render Back button if not on first page
    if (currentPage > 1) {
      paginationButtons.push(this.renderDirectionalButton("<<"));
    }

    // Ensures no 'empty' pages for small sets of table data
    if (totalPages < topPageNumber) {
      var topButtonNumber = totalPages;
    } else {
      topButtonNumber = topPageNumber;
    }

    for (let i = bottomPageNumber; i <= topButtonNumber; i++) {
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
    if (topPageNumber < totalPages && currentPage < totalPages) {
      paginationButtons.push(this.renderDirectionalButton(">>"));
    }

    return paginationButtons;
  }

  handleSearchQuery = (e) => {
    const searchQuery = e.currentTarget.value;
    this.setState({ searchQuery, currentPage: 1 });
  };

  renderTableHeader(headers) {
    const tableHeader = [];
    headers.forEach((header) => {
      tableHeader.push(
        <th
          scope="col"
          onClick={() => this.handleSortColumns(header)}
          key={header}
        >
          {_.capitalize(header)}
          {this.state.sortable && this.renderSortIcon(header)}
        </th>
      );
    });
    if (this.props.deleteButton)
      tableHeader.push(
        <th scope="col" key="delete">
          Delete
        </th>
      );
    return tableHeader;
  }

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

  render() {
    return null;
  }
}

export default Table;

// class Table extends Component {
//   state = {};

//   renderTableHeader(headers) {
//     const tableHeader = [];
//     headers.forEach((header) => {
//       tableHeader.push(
//         <th
//           scope="col"
//           //   onClick={() => this.handleSortColumns(header)}
//           key={header}
//         >
//           {_.capitalize(header)}
//           {/* {this.state.sortable && this.renderSortIcon(header)} */}
//         </th>
//       );
//     });
//     if (this.props.deleteButton)
//       tableHeader.push(
//         <th scope="col" key="delete">
//           Delete
//         </th>
//       );
//     return tableHeader;
//   }

//   renderTableBody(data, headers) {
//     const tableBody = [];
//     const newArray = _.map(data, _.partialRight(_.pick, headers));
//     const x = [];
//     for (let entry of newArray) {
//       const values = Object.values(entry);
//       //   x.push(entry);
//       console.log(values);
//     }

//     // console.log(newArray);
//     for (let entry of data) {
//       for (let header of headers) {
//         tableBody.push(<td>{entry[header]}</td>);
//       }
//     }
//     return tableBody;
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <table className="table table-striped m-auto">
//           <thead>{this.renderTableHeader(this.props.headers)}</thead>
//           <tbody>
//             {this.renderTableBody(this.props.data, this.props.headers)}
//           </tbody>
//         </table>
//       </React.Fragment>
//     );
//   }
// }

// export default Table;
