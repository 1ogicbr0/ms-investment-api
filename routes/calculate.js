var express = require('express');
var router = express.Router();
const calculateCostSavingService = require('../services/calculate-cost-saving-service');


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET Entry to calculator service. */
router.get('/', async function(req, res, next) {
  console.log('req.params.query --> ', req.query);

  const params = {
    rate: 0.06,
    pv: parseFloat(req.query.pv) || 0,
    age: parseFloat(req.query.age),
    typeOfInstitution: req.query.typeOfInstitution,
    yearsOfStudy: parseFloat(req.query.yearsOfStudy),
    monthlyContribution: parseFloat(req.query.monthlyContribution),
    currentTertiarySavings: parseFloat(req.query.currentTertiarySavings)
  }
  chartParams = await calculateCostSavingService.calculateCostSaving(params)
  console.log('chartParams --> ', chartParams);


  res.status(200).json({chartParams: chartParams});
});

module.exports = router;