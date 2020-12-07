import React, { Component } from "react";
import Leaderboard from "./common/leaderboard";
import { getUserLeaderboard } from "../services/httpservice";

class UserPage extends Component {
  state = {};

  componentDidMount = async () => {
    const { data: userScores } = await getUserLeaderboard(
      this.props.match.params.id
    );

    this.setState({ userScores });
  };

  render() {
    const { userScores } = this.state;
    return (
      <div>
        {!userScores ? (
          <div></div>
        ) : (
          <Leaderboard
            data={userScores}
            searchbar={false}
            pagination={true}
            title={`${userScores[0].name}'s Scores`}
            sortable={true}
          />
        )}
      </div>
    );
  }
}

export default UserPage;
