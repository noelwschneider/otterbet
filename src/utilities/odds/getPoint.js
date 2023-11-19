function getPoint(wager) {
    if(!wager) return '';
    if (wager.market === 'h2h') {
        return wager.price.american;
    }

    let prefix = '';
    if (wager.market === 'spreads') {
        prefix = '+';
    }

    //! I need to figure out what odds-api will give me for the point property if the line is 0 -- it will probably be a string, but could be 0
    let newPoint = wager.point;
    if (newPoint >= 0) {
        newPoint = `${prefix}${Number(newPoint).toFixed(1)}`;
    } else if (newPoint < 0) {
        newPoint = `${Number(newPoint).toFixed(1)}`;
    } else if (!newPoint) {
        newPoint = '';
    } else {
        console.log('some unforeseen value:', newPoint);
    }

    //& eventually let the user determine whether they prefer American or European odds format
    let cellString = `${newPoint}`;

    return cellString;
}
module.exports = getPoint;