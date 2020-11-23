import React, { Component } from "react";

class RulesPage extends Component {
  render() {
    return (
      <div className="vh-auto">
        <div
          className="container col-sm- m-5 bg-light d-flex flex-column mx-auto"
          style={{ height: "420px" }}
        >
          <div className="row">
            <button
              className="col-6 d-flex justify-content-center text-center py-2 border bg-secondary text-white"
              onClick={() => this.props.handleSynonymGameClick()}
            >
              Synonym Game
            </button>
            <button
              className="col-6 d-flex justify-content-center text-center py-2 border bg-secondary text-white"
              onClick={() => this.props.handleRulesClick()}
            >
              Rules
            </button>
          </div>{" "}
          <div className="row justify-content-md-center pt-5 h-40">
            <h1 className="text-capitalize display-4">Synonym Game Rules</h1>
          </div>
          <div className="row justify-content-md-center align-items-center h-50">
            <ul>
              <li>You have 3 lives</li>
              <li>Try and guess as many synonyms as you can!</li>
              <li>Example...</li>
              <li>Scoreboard coming soon!</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default RulesPage;
