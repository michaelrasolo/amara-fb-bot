const express = require("express");
const router = express.Router();
const teamInfo = require("../modules/teamInfo");
const teamStadium = require("../modules/teamStadium");
const teamRank = require("../modules/teamRank");
const teamNextGame = require("../modules/teamNextGame");
const teamLastGame = require("../modules/teamLastGame");
const teamPlayers = require("../modules/teamPlayers");

// All functions in an object
const intentFunctions = {
  teamInfo: teamInfo,
  teamStadium: teamStadium,
  teamRank: teamRank,
  teamNextGame: teamNextGame,
  teamLastGame: teamLastGame,
  teamPlayers: teamPlayers,
};

/* Fullfillment route */
router.post("/", function (req, res) {
  const intent = req.body.queryResult.intent.displayName.split(' ')[0];
  const team = req.body.queryResult.parameters.teams;
  console.log("intent", intent);

  // if the intent name exists, call the corresponding function
  if (intentFunctions[intent]) {
    intentFunctions[intent](team) 
      .then((fulfillmentMessages) => {
        res.send(fulfillmentMessages);
      })
      .catch((error) => {
        console.error("Error fetching team info:", error);
        // Handle the error and send an error response if needed.
        res.status(500).send("Internal Server Error");
      });
  } else {
    // intent name is not recognized
    console.error("Unknown intent:", intent);
    res.status(400).send("Bad Request");
  }
});

router.get('/get', function(req, res) {
  console.log("index route");
  res.send('index route')
  });
module.exports = router;
