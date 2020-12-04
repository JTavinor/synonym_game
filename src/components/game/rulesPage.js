import React, { Component } from "react";

class RulesPage extends Component {
  render() {
    return (
      <React.Fragment>
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
            <li>
              Once you start the game you have 90 seconds to score as high as
              you can!
            </li>
            <li>
              But don't just pass on tough words, as you only have three lives!
            </li>
            <li>Once the timer or your lives hit zero that's game over</li>
            <li>Good luck!</li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default RulesPage;
