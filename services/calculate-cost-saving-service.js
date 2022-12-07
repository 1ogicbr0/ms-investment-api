const futureValueService = require('./future-value-service');
const utils = require('./utils');

const calculateCostSaving = async function (params) {

  const INFLATION_RATE = 0.06;
  const COMPOUNDING_FREQUENCY = 12;
  const compundingPeriod = 18 - params.age;
  const DISCOUNT = 0.00;
  const UNIVERSITY_FEES =
    {
        "BA_Degree": 44035.13,
        "BCom_Degree": 44940.75,
        "BSc_Degree": 48401.25,
        "LLB_Degree": 45028.57,
        "BEng_Degree": 52593.29
    };
  /*const UNIVERSITY_FEES = [
    {
        "BA_Degree": 44035.13,
        "BCom_Degree": 44940.75,
        "BSc_Degree": 48401.25,
        "LLB_Degree": 45028.57,
        "BEng_Degree": 52593.29
    }
    {
      "universityName": "University of Free State",
      "degeeFee": [
        {"BA_Degree": 33670.00},
        {"BCom_Degree": 433395.00},
        {"BSc_Degree": 40825.00},
        {"LLB_Degree": 437380.00},
        {"BEng_Degree": null}
      ]
    },
    {
      "universityName": "University of Johannesburg",
      "degeeFee": [
        {"BA_Degree": 40015.00},
        {"BCom_Degree": 32560.00},
        {"BSc_Degree": 50020.00},
        {"LLB_Degree": 38895.00},
        {"BEng_Degree": 47330.00}
      ]
    },
    {
      "universityName": "Average",
      "degeeFee": [
        {"BA_Degree": 44035.13},
        {"BCom_Degree": 44940.75},
        {"BSc_Degree": 48401.25},
        {"LLB_Degree": 45028.57},
        {"BEng_Degree": 52593.29}
      ]
    }
  ];*/

  const averageDegreeFee = parseFloat(UNIVERSITY_FEES.BA_Degree + UNIVERSITY_FEES.BCom_Degree + UNIVERSITY_FEES.BSc_Degree + UNIVERSITY_FEES.LLB_Degree + UNIVERSITY_FEES.BEng_Degree)/5 ;
  const INSTITUTION_FESS_MAP = {
    "Public University": averageDegreeFee,
    "TVET": averageDegreeFee * 0.8,
    "Private College": averageDegreeFee * 0.9,
    "Trade School": averageDegreeFee * 0.5
  };

  const annualCostOfDegreeToday = INSTITUTION_FESS_MAP[params.typeOfInstitution];

  let futureValueParams = {
    "rate": INFLATION_RATE,
    "period": compundingPeriod,
    "pmt": 0,
    "pv": -annualCostOfDegreeToday,
    "type": 0
  };

  const firstYearCostFromToday = await futureValueService.calculateFutureValue(futureValueParams);

  futureValueParams = {
    "rate": INFLATION_RATE,
    "period": params.yearsOfStudy - 1,
    "pmt": -firstYearCostFromToday,
    "pv": -firstYearCostFromToday,
    "type": 0
  };

  const totalCostOfTertiary = await futureValueService.calculateFutureValue(futureValueParams);

  console.log('totalCostOfTertiary ---->', totalCostOfTertiary);

  const fieldMap = {
    "Total_Cost_of_Tertiary": totalCostOfTertiary
  };

  const scholarshipGrantsDiscounts = parseFloat(totalCostOfTertiary) * DISCOUNT;
  fieldMap['Scholarships_Grants_Discounts'] = scholarshipGrantsDiscounts * -1;

  futureValueParams = {
    "rate": 0.1 / COMPOUNDING_FREQUENCY,
    "period": compundingPeriod * COMPOUNDING_FREQUENCY,
    "pmt": -params.monthlyContribution,
    "pv": -params.currentTertiarySavings,
    "type": 1
  };
  console.log('futureValueParams ---->', futureValueParams);

  const futureValueOfSavings = await futureValueService.calculateFutureValue(futureValueParams);

  fieldMap['Future_Value_of_Savings'] = parseFloat(futureValueOfSavings);
  const tertiarySavingsGap = parseFloat(futureValueOfSavings) - parseFloat(totalCostOfTertiary) * (1 - DISCOUNT);
  fieldMap['Tertiary_Savings_Gap'] = tertiarySavingsGap;
  const adjustedCostOfTertiary = parseFloat(totalCostOfTertiary) + parseFloat(scholarshipGrantsDiscounts.toFixed(2) * -1);
  console.log('adjustedCostOfTertiary ---->', adjustedCostOfTertiary);
  fieldMap["Adjusted_Cost_of_Tertiary"] = adjustedCostOfTertiary;
  const projectedTertiarySavings = parseFloat(futureValueOfSavings);
  console.log('projectedTertiarySavings ---->', projectedTertiarySavings);
  fieldMap["Projected_Tertiary_Savings"] = projectedTertiarySavings;

  fieldMap["Tertiary_savings_gap1"] = projectedTertiarySavings - adjustedCostOfTertiary < 0 ? projectedTertiarySavings - adjustedCostOfTertiary : 0;

  fieldMap["Projected_tertiary_savings_surplus"] = projectedTertiarySavings - adjustedCostOfTertiary > 0 ? projectedTertiarySavings - adjustedCostOfTertiary : 0;
  //
  const scholarPercentage = (parseFloat(fieldMap["Scholarships_Grants_Discounts"]) / parseFloat(fieldMap["Total_Cost_of_Tertiary"])).toFixed(2);
  let tertiaryPercentage = (parseFloat(fieldMap["Projected_Tertiary_Savings"]) / parseFloat(fieldMap["Total_Cost_of_Tertiary"])).toFixed(2);

  tertiaryPercentage = tertiaryPercentage < 0 ? 0 : tertiaryPercentage * -1;

  savingsPercentage = (parseFloat(fieldMap["Tertiary_savings_gap1"]) / parseFloat(fieldMap["Total_Cost_of_Tertiary"])).toFixed(2);
  //
  const lastYearOfStudy = new Date().getFullYear() + 18 - params.age + params.yearsOfStudy;
  const middleText = "Total cost of tertiary in " + lastYearOfStudy;
  console.log('lastYearOfStudy ---->', lastYearOfStudy);
  const datasets = "datasets:[{data:[" + tertiaryPercentage + "," + savingsPercentage + "],backgroundColor:['Green','Red']}]";
  console.log('datasets ---->', datasets);

  const formatAmountParams = {
    "amount1": parseFloat(fieldMap["Scholarships_Grants_Discounts"]).toFixed(0),
    "amount2": parseFloat(fieldMap["Projected_Tertiary_Savings"]).toFixed(0),
    "amount3": parseFloat(fieldMap["Tertiary_savings_gap1"]).toFixed(0),
    "amount4": parseFloat(fieldMap["Total_Cost_of_Tertiary"]).toFixed(0),
    "amount5": parseFloat(fieldMap["Adjusted_Cost_of_Tertiary"]).toFixed(0)
  };

  const response = await utils.formatAmounts(formatAmountParams);

  const displaySgd = response.formattedAmount1;
  const displayPts = response.formattedAmount2;
  const displayTsg = response.formattedAmount3;
  const formattedCostOfTertiary = response.formattedAmount4;
  const adjustedCost = response.formattedAmount5;
  //
  const monthlyContribution = params.monthlyContribution.toString();
  const newText = "R " + monthlyContribution;
  //
  const currentSavings = params.currentTertiarySavings.toString();
  const newCurrentSavingsText = "R " + currentSavings;
  //
  const description = params.age + " year old child to a " + params.typeOfInstitution + " in " + (new Date().getFullYear() + 18 - params.age) + " for " + params.yearsOfStudy + " years will cost about " + formattedCostOfTertiary + ". Saving " + newText + " per month with current savings of " + newCurrentSavingsText + " you will have a " + displayTsg + " savings gap.";
  console.log('description ---->', description);
  //
  const leadInfo = {"Company":"N/A","First Name":params.firstName,"Last_Name":params.Lastname,"Mobile":params.phone,"Email":params.email,"Lead_Source":"Calculator","Description":description,"Total_Cost_of_Study":formattedCostOfTertiary,"Savings_gap":displayTsg,"Projected_Savings":displayPts,"Adjusted_Cost":adjustedCost.toString(),"Monthly_Contribution":newText};
  //const leadResponse = zoho.crm.createRecord("Leads",leadInfo,{"trigger":{"workflow"}});
  const labels = "'Projected Savings: " + displayPts + "','Savings gap: " + displayTsg + "'";
  console.log('labels ---->', labels);

  console.log("https://quickchart.io/chart?width=135&height=300&c={type:'doughnut',data:{labels:[" + labels + "]," + datasets + "},options:{cutoutPercentage:60,legend:{labels:{fontStyle:'bold',fontSize:6,fontColor:'black',padding:4},position:'bottom',align:'start'},plugins:{datalabels:{display:false,align:'right',}, doughnutlabel:{labels:[{text:'" + formattedCostOfTertiary + "',font:{size:10,color:'black',weight:'bold'}},{text:'" + middleText + "',font:{size:10,color:'black',weight:'bold'}}]}}}}");

  return {
    "url": "https://quickchart.io/chart?width=135&height=300&c={type:'doughnut',data:{labels:[" + labels + "]," + datasets + "},options:{cutoutPercentage:60,legend:{labels:{fontStyle:'bold',fontSize:6,fontColor:'black',padding:4},position:'bottom',align:'start'},plugins:{datalabels:{display:false,align:'right',}, doughnutlabel:{labels:[{text:'" + formattedCostOfTertiary + "',font:{size:10,color:'black',weight:'bold'}},{text:'" + middleText + "',font:{size:10,color:'black',weight:'bold'}}]}}}}",
    "labels": labels,
    "datasets": datasets,
    "formattedCostOfTertiary": formattedCostOfTertiary,
    "middleText": middleText
  };

}

module.exports = {
  calculateCostSaving
};