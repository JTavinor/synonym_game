import React, { Component } from "react";
import "./App.css";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import NavBar from "./components/common/navbar";
import Login from "./components/pages/loginPage";
import UserPage from "./components/pages/userPage";
import LeaderBoardPage from "./components/pages/leaderboardPage";
import PersonalPage from "./components/pages/personalPage";
import HomePage from "./components/pages/homePage";

class App extends Component {
  state = {};

  componentDidMount = async () => {
    if (!this.state.user) {
      try {
        const jwt = localStorage.getItem("x-auth-token");
        const user = jwtDecode(jwt);
        this.setState({ user });
      } catch (ex) {
        return null;
      }
    }
  };

  handleLogout = () => {
    const user = null;
    this.setState({ user });
    localStorage.clear();
  };

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <div className="body">
          <header>
            <NavBar handleLogout={this.handleLogout} user={user} />
          </header>
          <main>
            <BrowserRouter>
              <Switch>
                {user && (
                  <Redirect
                    from={`/users/${user._id}`}
                    exact
                    to="/personalPage"
                  />
                )}
                <Route path="/users/:id" component={UserPage} />
                <Route path="/leaderboard" component={LeaderBoardPage} />
                <Route
                  path="/login"
                  render={(props) => <Login {...props} loginSelected={true} />}
                />
                {user && (
                  <Route
                    exact
                    path="/personalPage"
                    render={(props) => <PersonalPage {...props} user={user} />}
                  />
                )}
                <Route
                  path="/"
                  render={(props) => <HomePage {...props} user={user} />}
                />
              </Switch>
            </BrowserRouter>
          </main>
          <footer>A Joe Tavinor Web Game</footer>{" "}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
