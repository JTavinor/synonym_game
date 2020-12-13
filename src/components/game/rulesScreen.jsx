import React from "react";

const RulesPage = () => {
  return (
    <React.Fragment>
      <div className="row justify-content-center pt-md-5 pt-sm-4 pt-xs-3 pb-2 h-40">
        <h1>
          <u>Rules of the game</u>
        </h1>
      </div>
      <div className="row justify-content-md-center align-items-center overflow-auto">
        <ul>
          <li>
            For each word that appears on the screen, you need to give a word
            associated with it
          </li>
          <li>
            For example, words associated with "Temperature" could be:
            <ul>
              <li>Thermometer</li>
              <li>Heat</li>
              <li>Climate</li>
            </ul>
          </li>
          <li>
            Once the game starts you have 90 seconds to score as high as you
            can!
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
};

export default RulesPage;
