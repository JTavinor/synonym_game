import React from "react";
import "./App.css";
import Game from "./game.jsx/game";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Leaderboard from "./game.jsx/leaderboard";
import NavBar from "./game.jsx/navbar";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <BrowserRouter>
        <Switch>
          <Route
            path="/leaderboard"
            exact
            render={(props) => (
              <Leaderboard
                {...props}
                apiRoute={"http://localhost:5000/fullLeaderboard"}
              />
            )}
          />
          <Route path="/" component={Game} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
