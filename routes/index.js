var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  console.log("index route");
  res.send('index route')
  });
  

module.exports = router;
