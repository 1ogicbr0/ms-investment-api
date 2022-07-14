var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api/futureValue', function(req, res, next) {
  res.type('json');
  res.send({ some: 'json' });
});

module.exports = router;
