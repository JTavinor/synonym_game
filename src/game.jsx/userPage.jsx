import React, { Component } from "react";
import axios from "axios";
import Leaderboard from "./leaderboard";

class UserPage extends Component {
  state = {};

  componentWillMount = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/users/${this.props.match.params.id}`
    );

    this.setState({ data });
  };

  render() {
    if (!this.state.data) {
      // Just wait for the memory to be available
      return null;
    }
    return (
      <Leaderboard
        apiRoute={"http://localhost:5000/leaderboard/fullLeaderboard"}
        search={false}
        name={this.state.data.userName}
        x={true}
      ></Leaderboard>
    );
  }
}

export default UserPage;
