import React, { Component } from "react";
import axios from "axios";
import Leaderboard from "../common/leaderboard";

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
          <Leaderboard
            data={this.state.data}
            searchbar={true}
            pagination={true}
            title={"Leaderboard"}
            sortable={true}
          />
        )}
      </div>
    );
  }
}

export default LeaderBoardPage;

// import React, { Component } from "react";

// class LeaderBoardPage extends Component {
//   state = { counter: 10 };

//   // componentDidMount() {
//   //   if (this.state.counter > 0) {
//   //     setTimeout(() => {
//   //       const counter = this.state.counter - 1;
//   //       this.setState({ counter });
//   //     }, 1000);
//   //   }
//   // }
//   componentDidUpdate() {
//     const x = this.countdown();
//     clearTimeout(x);
//   }

//   countdown() {
//     if (this.state.counter > 0) {
//       return setTimeout(() => {
//         const counter = this.state.counter - 1;
//         this.setState({ counter });
//       }, 1000);
//     }
//   }

//   handleClick = () => {
//     const counter = this.state.counter + 10;
//     this.setState({ counter });
//   };

//   render() {
//     return (
//       <div>
//         <h1>{this.state.counter}</h1>
//         <button onClick={this.handleClick}>Click Me!</button>
//       </div>
//     );
//   }
// }

// export default LeaderBoardPage;
