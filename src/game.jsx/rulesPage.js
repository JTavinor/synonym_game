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
              Word Association Game
            </button>
            <button
              className="col-6 d-flex justify-content-center text-center py-2 border bg-secondary text-white"
              onClick={() => this.props.handleRulesClick()}
            >
              Rules
            </button>
          </div>{" "}
          <div className="row justify-content-md-center pt-5 h-40">
            <h1>Synonym Game Rules</h1>
          </div>
          <div className="row justify-content-md-center align-items-center h-50">
            <ul>
              <li>
                You will see a word on the screen, your job is to give a word
                associated with it.
              </li>
              <li>
                For example words associated with "Temperature" could be:
                <ul>
                  <li>Thermometer</li>
                  <li>Heat</li>
                  <li>Climate</li>
                </ul>
              </li>
              <li>You have 3 lives, see how you fare on the leaderboard!</li>
              <li>Good luck!</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default RulesPage;
