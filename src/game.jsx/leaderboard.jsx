import React, { Component } from "react";

class Leaderboard extends Component {
  state = { z: [], currentPag: 1 };

  renderTable() {
    const slicedLeaderboard = this.state.z.slice(
      5 * this.state.currentPag - 5,
      5 * this.state.currentPag
    );
    return slicedLeaderboard.map((x) => (
      <tr key={this.state.z.indexOf(x) + 1}>
        <th scope="col">{this.state.z.indexOf(x) + 1}</th>
        <th scope="col">{x.name}</th>
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
    const pag = [];
    for (let i = 1; i <= Math.ceil(this.state.z.length / 5); i++) {
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

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const apiUrl = this.props.apiRoute;
    const z = await fetch(apiUrl).then((response) => response.json());
    this.setState({ z });
  }

  render() {
    return (
      <div
        className="container col-sm- mt-5 mb-2 bg-light d-flex py-3 flex-column mx-auto"
        style={{ height: "auto" }}
      >
        <h1 className="row m-auto">Leaderboard</h1>
        <table className="table table-striped m-auto">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
              <th scope="col">Date</th>
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
