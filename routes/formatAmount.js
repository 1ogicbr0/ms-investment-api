var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('req.params.query --> ', req.query);

  const amount = parseFloat(req.query.amount);

  const formattedAmount = amount.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });

  console.log('formattedAmount ---> ', formattedAmount);

  res.status(200).json({formattedAmount: formattedAmount});
});

module.exports = router;
