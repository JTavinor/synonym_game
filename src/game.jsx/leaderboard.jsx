import React, { Component } from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class Leaderboard extends Component {
  state = {
    z: [],
    currentPag: 1,
    name: "",
    searchbar: true,
    cols: {},
  };

  handleChange = (e) => {
    const name = e.currentTarget.value;
    this.setState({ name, currentPag: 1 });
  };

  renderTable() {
    const lb = this.state.z.filter((x) =>
      x.name.toLowerCase().includes(this.state.name.toLowerCase())
    );

    const slicedLeaderboard = lb.slice(
      5 * this.state.currentPag - 5,
      5 * this.state.currentPag
    );
    // console.log(lb);
    return slicedLeaderboard.map((x) => (
      <tr key={this.state.z.indexOf(x) + 1}>
        <th scope="col">{x.rank}</th>
        <th scope="col">
          {(x.user._id && <Link to={`/users/${x.user._id}`}>{x.name}</Link>) ||
            x.name}
        </th>
        <th scope="col">{x.score}</th>
        <th scope="col">{x.date}</th>
      </tr>
    ));
  }

  handlePag(i) {
    this.setState({ currentPag: i });
  }

  renderPaginationButtons() {
    if (this.props.apiRoute === "http://localhost:5000/") {
      return;
    }

    const lb = this.state.z.filter((x) =>
      x.name.toLowerCase().includes(this.state.name.toLowerCase())
    );

    const pag = [];
    for (let i = 1; i <= Math.ceil(lb.length / 5); i++) {
      if (Math.ceil(lb.length / 5) === 1) return;
      pag.push(
        <button
          className="btn btn-primary mx-1"
          onClick={() => this.handlePag(i)}
        >
          {i}
        </button>
      );
    }
    return pag;
  }

  filterTable(colName) {
    const lb = this.state.z;
    let cols = this.state.cols;
    if (!this.state.cols[colName]) {
      let filtered = _.orderBy(lb, [colName], ["asc"]);
      cols[colName] = true;
      this.setState({ z: filtered, cols });
    } else {
      let filtered = _.orderBy(lb, [colName], ["desc"]);
      cols[colName] = false;
      this.setState({ z: filtered, cols });
    }
    this.setState({ curCol: colName });
  }

  renderSortIcon(colName) {
    if (this.state.curCol != colName) return null;
    if (this.state.cols[colName]) {
      return <i className="fa fa-sort-asc"></i>;
    }
    return <i className="fa fa-sort-desc"></i>;
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const apiUrl = this.props.apiRoute;
    const z = await fetch(apiUrl).then((response) => response.json());
    for (let i = 1; i <= z.length; i++) {
      z[i - 1].rank = i;
    }
    this.setState({ z });

    if (this.props.apiRoute === "http://localhost:5000/") {
      this.setState({ searchbar: false });
    }

    if (this.props.x) {
      this.setState({ searchbar: this.props.search, name: this.props.name });
    }
  }

  handleSelect() {
    this.setState({ curCol: "" });
  }

  render() {
    // console.log(this.props);
    return (
      <div
        className="container col-sm- mt-5 mb-2 bg-light d-flex py-3 flex-column mx-auto"
        style={{ height: "auto" }}
      >
        <h1 className="row m-auto">Leaderboard </h1>
        <div className="row justify-content-md-center m-auto"></div>
        {this.state.searchbar && (
          <input
            type="text"
            className="form-control col-align-self-center col-8 mx-auto my-2"
            id="synonymGuess"
            aria-describedby="emailHelp"
            placeholder="Search Leaderboard..."
            onChange={(e) => this.handleChange(e)}
            onSelect={() => this.handleSelect()}
          ></input>
        )}
        <table className="table table-striped m-auto">
          <thead>
            <tr>
              <th scope="col" onClick={() => this.filterTable("rank")}>
                Rank {this.renderSortIcon("rank")}
              </th>
              <th scope="col" onClick={() => this.filterTable("name")}>
                Name {this.renderSortIcon("name")}
              </th>
              <th scope="col" onClick={() => this.filterTable("score")}>
                Score {this.renderSortIcon("score")}
              </th>
              <th scope="col" onClick={() => this.filterTable("date")}>
                Date {this.renderSortIcon("date")}
              </th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
        <ul className="list-group list-group-horizontal mt-2 row justify-content-md-center">
          {this.renderPaginationButtons()}
        </ul>
      </div>
    );
  }
}

export default Leaderboard;
