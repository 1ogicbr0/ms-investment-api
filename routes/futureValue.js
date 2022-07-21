var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('req.params.query --> ', req.query);

  const pow = Math.pow(1 + parseFloat(req.query.rate), req.query.period);

  let fv = 0;

  req.query.pv = parseFloat(req.query.pv) || 0;
  req.query.type = parseFloat(req.query.type) || 0;

  if (parseFloat(req.query.rate)) {
    fv = (parseFloat(req.query.pmt) * (1 + parseFloat(req.query.rate) * parseFloat(req.query.type)) * (1 - pow)/parseFloat(req.query.rate)) - parseFloat(req.query.pv) * pow;
  } else {
    fv = -1 * (parseFloat(req.query.pv) + parseFloat(req.query.pmt) * req.query.period);
  }

  res.status(200).json({futureValue: fv.toFixed(2)});
});

module.exports = router;
