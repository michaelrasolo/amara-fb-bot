var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET users listing. */
router.post('/', function(req, res) {
console.log(req.body);});

module.exports = router;
