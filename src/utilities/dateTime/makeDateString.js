const isDateString = require('./isDateString');

function makeDateString(date) {
    if (isDateString(date)) return date;
    if (!date) {
      date = new Date();
    }
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
}

module.exports = makeDateString;