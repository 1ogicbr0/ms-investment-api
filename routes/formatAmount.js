var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('req.params.query --> ', req.query);

  const amount1 = parseFloat(req.query.amount1) < 0 ? (-1 * parseFloat(req.query.amount1)) : parseFloat(req.query.amount1);
  const amount2 = parseFloat(req.query.amount2) < 0 ? (-1 * parseFloat(req.query.amount2)) : parseFloat(req.query.amount2);
  const amount3 = parseFloat(req.query.amount3) < 0 ? (-1 * parseFloat(req.query.amount3)) : parseFloat(req.query.amount3);
  const amount4 = parseFloat(req.query.amount4) < 0 ? (-1 * parseFloat(req.query.amount4)) : parseFloat(req.query.amount4);
  //
  const formattedAmount1 =  parseFloat(amount1).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }).replace(',00','');
  const formattedAmount2 =  parseFloat(amount2).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }).replace(',00','');
  const formattedAmount3 =  parseFloat(amount3).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }).replace(',00','');
  const formattedAmount4 =  parseFloat(amount4).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }).replace(',00','');

  res.status(200).json({formattedAmount1: formattedAmount1, formattedAmount2: formattedAmount2, formattedAmount3: formattedAmount3, formattedAmount4: formattedAmount4});
});

module.exports = router;
