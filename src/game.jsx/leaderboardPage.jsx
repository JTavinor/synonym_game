import React, { Component } from "react";
import Leaderboard2 from "./leaderboard2";
import axios from "axios";

class LeaderBoardPage extends Component {
  state = {};
  async componentDidMount() {
    const { data } = await axios.get(
      "http://localhost:5000/leaderboard/fullLeaderboard"
    );
    this.setState({ data });
  }

  render() {
    return (
      <div>
        {!this.state.data ? (
          <div></div>
        ) : (
          <Leaderboard2
            data={this.state.data}
            searchbar={true}
            pagination={true}
            title={"Leaderboard"}
          />
        )}
      </div>
    );
  }
}

export default LeaderBoardPage;
