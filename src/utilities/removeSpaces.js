function removeSpaces(string) {
    let unspaced = [];
    for (let character of string) {
        if (character == ' ') {
            unspaced.push('_');
        } else {
            unspaced.push(character);
        }
    }
    return unspaced.join('');
}

module.exports = removeSpaces;