import React, { Component } from "react";
import GameContainer from "./game/gameContainer";
import Leaderboard from "./common/leaderboard";
import { getLeaderboard } from "../services/httpservice";

class HomePage extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await getLeaderboard();
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <GameContainer data={data} />
        {!data ? (
          <div></div>
        ) : (
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
