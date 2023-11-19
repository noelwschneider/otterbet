function toTitleCase(string) {
    return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
}

module.exports = toTitleCase;