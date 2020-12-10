import React, { Component } from "react";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <button
          className="col-6 d-flex justify-content-center text-center py-2 border bg-secondary text-white rounded-left"
          onClick={() => this.props.handleTabOne()}
        >
          {this.props.titleOne}
        </button>
        <button
          className="col-6 d-flex justify-content-center text-center py-2 border bg-secondary text-white rounded-right"
          onClick={() => this.props.handleTabTwo()}
        >
          {this.props.titleTwo}
        </button>
      </div>
    );
  }
}

export default Header;
