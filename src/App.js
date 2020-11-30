import React, { Component } from "react";
import "./App.css";
import Game from "./game.jsx/game";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Leaderboard from "./game.jsx/leaderboard";
import NavBar from "./game.jsx/navbar";
import Login from "./game.jsx/login";
import jwtDecode from "jwt-decode";
import axios from "axios";
import UserPage from "./game.jsx/userPage";

// axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
//   "x-auth-token"
// );

class App extends Component {
  state = {};

  componentWillMount = async () => {
    try {
      const jwt = localStorage.getItem("x-auth-token");
      const user = await axios.get("http://localhost:5000/users/me", {
        headers: { "x-auth-token": jwt },
      });
      this.setState({ user: user.data });
    } catch (ex) {
      return null;
    }
  };

  handleLogout = () => {
    console.log("Logging out...");
    const user = null;
    this.setState({ user });
    localStorage.clear();
  };

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar handleLogout={this.handleLogout} user={user} />
        <BrowserRouter>
          <Switch>
            <Route path="/users/:id" component={UserPage} />
            <Route
              path="/leaderboard"
              exact
              render={(props) => (
                <Leaderboard
                  {...props}
                  apiRoute={"http://localhost:5000/leaderboard/fullLeaderboard"}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} user={user} />}
            />
            <Route path="/userpage" component={UserPage} />
            <Route
              path="/"
              render={(props) => <Game {...props} user={user} />}
            />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
