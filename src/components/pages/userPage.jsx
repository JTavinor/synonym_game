import React, { Component } from "react";
import Leaderboard from "../tables/leaderboardTable";
import { getUserLeaderboard } from "../../services/leaderboardServices";

// When you click on a different users page, it will show your a leaderboard of their scores
class UserPage extends Component {
  state = {};

  componentDidMount = async () => {
    // Gets a specific users scores
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
