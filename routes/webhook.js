var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
console.log("Webhook route");
res.send('Webhook route')
});

module.exports = router;
