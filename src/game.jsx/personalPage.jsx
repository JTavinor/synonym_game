import React, { Component } from "react";
import axios from "axios";
import Leaderboard from "./leaderboard";
import Leaderboard2 from "./leaderboard2";

class PersonalPage extends Component {
  state = {};

  componentWillMount = async () => {
    const { data: user } = await axios.get(
      `http://localhost:5000/users/${this.props.match.params.id}`
    );

    const { data } = await axios.get(
      `http://localhost:5000/leaderboard/${this.props.match.params.id}`
    );

    this.setState({ user, data });
  };

  render() {
    if (!this.state.data) {
      // Just wait for the memory to be available
      return null;
    }
    return (
      <div>
        {!this.state.data ? (
          <div></div>
        ) : (
          <Leaderboard2
            data={this.state.data}
            searchbar={true}
            pagination={false}
            title={`${this.state.data[0].name}'s Scores`}
            sortIcon={true}
          />
        )}
      </div>
    );
  }
}

export default PersonalPage;
