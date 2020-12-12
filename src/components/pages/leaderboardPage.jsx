import React, { Component } from "react";
import Leaderboard from "../tables/leaderboardTable";
import { getLeaderboard } from "../../services/leaderboardServices";

class LeaderBoardPage extends Component {
  state = {};

  componentDidMount = () => {
    this.getLeaderboardData();
  };

  getLeaderboardData = async () => {
    const { data } = await getLeaderboard();
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        {!data ? (
          <div></div>
        ) : (
          <Leaderboard
            data={data}
            searchBar={true}
            pagination={true}
            title={"Leaderboard"}
            sortable={true}
            deleteButton={false}
            refreshLeaderboard={this.getLeaderboardData}
          />
        )}
      </div>
    );
  }
}

export default LeaderBoardPage;
