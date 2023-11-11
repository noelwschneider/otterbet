const convertToAmerican = require('./convertToAmerican');

function getBetPointsText(bet) {
  let { market, price, point} = bet;
  price = { european: price, american: convertToAmerican(price) };

  if (market === 'h2h') {
    return price.american;
  }

  let prefix = '';
  if (market === 'spreads') {
    prefix = '+';
  }

  //! I need to figure out what odds-api will give me for the point property if the line is 0 -- it will probably be a string, but could be 0
  let newPoint = point
  if (newPoint >= 0) {
    newPoint = `${prefix}${Number(newPoint).toFixed(1)}`;
  } else if (newPoint < 0) {
    newPoint = `${Number(newPoint).toFixed(1)}`;
  } else if (!newPoint) {
    newPoint = '';
  } else {
    console.log('some unforeseen value:', newPoint);
  }

  //! eventually let the user determine which odds format they prefer
  let cellString = `${newPoint} (${price.american})`;

  return cellString;
}

module.exports = getBetPointsText;