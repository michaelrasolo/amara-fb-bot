var express = require('express');
var router = express.Router();
const fetch = require("node-fetch") // node-fetch install
/* GET home page. */
router.get('/', function(req, res) {
  console.log("index route");
  res.send('index route')
  });
  

module.exports = router;
