import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Synonym Game
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/leaderboard">
                Leaderboard
              </a>
            </li>

            {(this.props.user && (
              <React.Fragment>
                <li className="nav-item">
                  <a className="nav-link" href="/userpage">
                    {this.props.user.userName}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/"
                    onClick={() => this.props.handleLogout()}
                  >
                    Logout
                  </a>
                </li>
              </React.Fragment>
            )) || (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login / Register
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
