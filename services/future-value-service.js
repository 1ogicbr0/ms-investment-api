const calculateFutureValue = async function (params) {

  const pow = Math.pow(1 + parseFloat(params.rate), params.period);

  let fv = 0;

  const pv = parseFloat(params.pv) || 0;
  let type = parseFloat(params.type) || 0;

  if (parseFloat(params.rate)) {
    fv = (parseFloat(params.pmt) * (1 + parseFloat(params.rate) * parseFloat(type)) * (1 - pow)/parseFloat(params.rate)) - parseFloat(pv) * pow;
  } else {
    fv = -1 * (parseFloat(pv) + parseFloat(params.pmt) * params.period);
  }
  return fv;
}

module.exports = {
  calculateFutureValue
};