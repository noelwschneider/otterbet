function convertToAmerican(price) {
  let num = price - 1

  if (price >= 2) {
    num *= 100;
    num = Math.round(num);
    num = `+${num}`;
  }

  if (price < 2) {
    num = 1 / num;
    num *= 100;
    num = Math.round(num);
    num = `-${num}`;
  }
  return num;
}

module.exports = convertToAmerican;