import React, { Component } from "react";

class GameHeader extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <button
          className="col-6 d-flex justify-content-center text-center py-2 border bg-secondary text-white rounded-left"
          onClick={() => this.props.handleGameTab()}
        >
          Word Association Game
        </button>
        <button
          className="col-6 d-flex justify-content-center text-center py-2 border bg-secondary text-white rounded-right"
          onClick={() => this.props.handleRulesTab()}
        >
          Rules
        </button>
      </div>
    );
  }
}

export default GameHeader;
