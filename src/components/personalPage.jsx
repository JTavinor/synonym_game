import React, { Component } from "react";
import axios from "axios";
import Leaderboard from "./common/leaderboard";
import { getUserLeaderboard } from "../services/httpservice";

class PersonalPage extends Component {
  state = {};

  componentDidMount = async () => {
    console.log(this.props);
    const { data: userScores } = await getUserLeaderboard(this.props.user._id);

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
            deleteButton={true}
          />
        )}
      </div>
    );
  }
}

export default PersonalPage;
