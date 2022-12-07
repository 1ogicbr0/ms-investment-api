const formatAmounts = async function (params) {

  const amount1 = parseFloat(params.amount1) < 0 ? (-1 * parseFloat(params.amount1)) : parseFloat(params.amount1);
  const amount2 = parseFloat(params.amount2) < 0 ? (-1 * parseFloat(params.amount2)) : parseFloat(params.amount2);
  const amount3 = parseFloat(params.amount3) < 0 ? (-1 * parseFloat(params.amount3)) : parseFloat(params.amount3);
  const amount4 = parseFloat(params.amount4) < 0 ? (-1 * parseFloat(params.amount4)) : parseFloat(params.amount4);
  const amount5 = parseFloat(params.amount5) < 0 ? (-1 * parseFloat(params.amount5)) : parseFloat(params.amount5);
  //
  const formattedAmount1 =  parseFloat(amount1).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }).replace(',00','');
  const formattedAmount2 =  parseFloat(amount2).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }).replace(',00','');
  const formattedAmount3 =  parseFloat(amount3).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }).replace(',00','');
  const formattedAmount4 =  parseFloat(amount4).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }).replace(',00','');
  const formattedAmount5 =  parseFloat(amount5).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' }).replace(',00','');

  return {formattedAmount1: formattedAmount1, formattedAmount2: formattedAmount2, formattedAmount3: formattedAmount3, formattedAmount4: formattedAmount4, formattedAmount5: formattedAmount5};
}

module.exports = {
  formatAmounts
};