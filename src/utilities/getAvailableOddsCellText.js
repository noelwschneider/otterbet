function getAvailableOddsCellText(markets, outcome, line) {
    let cellArray = markets.filter(x => x.outcome === outcome && x.market === line);
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

    if (cellObject.market === 'h2h') {
      return cellObject.price.american;
    }

    let prefix = '';
    if (cellObject.market === 'spreads') {
      prefix = '+';
    }
    //! I need to figure out what odds-api will give me for the point property if the line is 0 -- it will probably be a string, but could be 0
    if (cellObject.point >= 0) {
      cellObject.point = `${prefix}${Number(cellObject.point).toFixed(1)}`;
    } else if (cellObject.point < 0) {
      cellObject.point = `${Number(cellObject.point).toFixed(1)}`;
    } else if (!cellObject.point) {
      cellObject.point = '';
    } else {
      console.log('some unforeseen value:', cellObject.point);
    }

    //& eventually let the user determine whether they prefer American or European odds format
    let cellString = `${cellObject.point} (${cellObject.price.american})`;

    cellObject.string = cellString;
    return cellObject;
}

module.exports = getAvailableOddsCellText;