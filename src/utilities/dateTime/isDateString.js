function isDateString(date) {
    if (typeof date !== 'string') return false;
    if (date.length !== 10) return false;
    if (date[4] !== '-' || date[7] !== '-') return false;
    if (isNaN(Date.parse(date))) return false;
    return true;
}

module.exports = isDateString;