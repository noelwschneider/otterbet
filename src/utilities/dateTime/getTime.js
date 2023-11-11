function getTime(timestamp) {
    let timeArray = [];
    for (let i = 11; i < 16; i++) {
        timeArray.push(timestamp[i]);
      };
      return timeArray.join('');
}

module.exports = getTime;