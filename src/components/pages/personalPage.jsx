import React, { Component } from "react";
import Leaderboard from "../tables/leaderboardTable";
import { getUserLeaderboard } from "../../services/leaderboardServices";
import WrongWords from "../tables/wrongWordsTable";

class PersonalPage extends Component {
  state = {};

  componentDidMount = async () => {
    const { data: userScores } = await getUserLeaderboard(this.props.user._id);
    this.setState({ userScores });
  };

  render() {
    const { userScores } = this.state;
    return (
      <div>
        {!userScores || userScores.length === 0 ? (
          <div></div>
        ) : (
          <Leaderboard
            data={userScores}
            searchBar={false}
            pagination={true}
            title={`Your Scores`}
            sortable={true}
            deleteButton={true}
          />
        )}
        <WrongWords user={this.props.user} />
      </div>
    );
  }
}

export default PersonalPage;
