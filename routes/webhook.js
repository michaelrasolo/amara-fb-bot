var express = require("express");
var router = express.Router();
const fetch = require("node-fetch"); 
const teamInfo = require("../controllers/webhookControllers"); 

/* WEBHOOK ROUTE */
router.post("/", function (req, res) {

// Call function for teamInfo intent
  teamInfo(req.body.queryResult.parameters.teams) // Teams entity
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
