function formatMarket(market) {
    if (market === "spreads") {
        return "Point spread";
    } else if (market === 'h2h') {
        return "Moneyline";
    } else if (market === 'totals') {
        return 'Over/Under';
    }
}
module.exports = formatMarket;