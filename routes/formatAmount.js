var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('req.params.query --> ', req.query);

  const formattedAmount1 =  parseFloat(req.query.amount1).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });
  const formattedAmount2 =  parseFloat(req.query.amount2).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });
  const formattedAmount3 =  parseFloat(req.query.amount3).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });
  const formattedAmount4 =  parseFloat(req.query.amount3).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });

  res.status(200).json({formattedAmount1: formattedAmount1, formattedAmount2: formattedAmount2, formattedAmount3: formattedAmount3, formattedAmount4: formattedAmount4});
});

module.exports = router;
