import React, { Component } from "react";
import GameContainer from "./game/gameContainer";
import Leaderboard from "./common/leaderboard";
import { getLeaderboard } from "../services/httpservice";

class HomePage extends Component {
  state = {};

  componentDidMount = () => {
    this._isMounted = true;
    this.getLeaderboardData();
  };

  getLeaderboardData = async () => {
    const { data } = await getLeaderboard();
    this.setState({ data });
  };

  componentWillUnmount = () => {
    this._isMounted = false;
    this.setState = (state, callback) => {
      return;
    };
  };

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <GameContainer
          data={data}
          user={this.props.user}
          refreshLeaderboard={this.getLeaderboardData}
        />
        {data && (
          <Leaderboard
            data={data}
            searchbar={false}
            pagination={false}
            title={"Top 5 scores"}
            key={data.length}
            sortable={false}
            pageLength={5}
          />
        )}
      </React.Fragment>
    );
  }
}

export default HomePage;
