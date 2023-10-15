var express = require("express");
var router = express.Router();
const teamInfo = require("../controllers/teamInfo"); 
const teamStadium = require("../controllers/teamStadium"); 
const teamRank = require("../controllers/teamRank"); 
const teamNextGame = require("../controllers/teamNextGame"); 
const teamLastGame = require("../controllers/teamLastGame"); 
const teamPlayers = require("../controllers/teamPlayers"); 

/* WEBHOOK ROUTE */
router.post("/", function (req, res) {
console.log("intent",req.body.queryResult.intent.displayName);
// Call function for teamInfo intent
teamPlayers(req.body.queryResult.parameters.teams) // Teams entity
  .then((fulfillmentMessages) => {
    
      res.send(fulfillmentMessages);
    })
    .catch((error) => {
      console.error("Error fetching team info:", error);
      // Handle the error and send an error response if needed.
      res.status(500).send("Internal Server Error");
    });
});



module.exports = router;
