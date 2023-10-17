const express = require("express");
const router = express.Router();
const teamInfo = require("../modules/teamInfo");
const teamStadium = require("../modules/teamStadium");
const teamRank = require("../modules/teamRank");
const teamNextGame = require("../modules/teamNextGame");
const teamLastGame = require("../modules/teamLastGame");
const teamPlayers = require("../modules/teamPlayers");

const intentFunctions = {
  teamInfo: teamInfo,
  teamStadium: teamStadium,
  teamRank: teamRank,
  teamNextGame: teamNextGame,
  teamLastGame: teamLastGame,
  teamPlayers: teamPlayers,
};

const errorMessage = {
  fulfillmentMessages: [
    {
      text: {
        text: [
          `I didn't catch that, can you please rephrase your question ?`,
        ],
      },
    },
  ],
};

/* WEBHOOK ROUTE */
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
    res.send(errorMessage);
  }
});

module.exports = router;
