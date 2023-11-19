const getPoint = require('./getPoint');

function getAvailableOddsCellText(lines, outcome, market) {
    let cellArray = lines.filter(x => x.outcome === outcome && x.market === market);
    if (cellArray.length === 0) {
      return { 
        available: false,
        point: 'n/a', 
        price: { 
            american: 'n/a' 
            } 
        };
    }
    let [cellObject] = cellArray;
    cellObject.available = true;

    cellObject.string = `${getPoint(cellObject)} (${cellObject.price.american})`;
    return cellObject;
}

module.exports = getAvailableOddsCellText;