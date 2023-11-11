function getDate(timestamp) {
    let string;
    let dateArray = [];
    
    if (typeof timestamp === 'object') {
        let year = timestamp.getUTCFullYear().toString();
        let month = (timestamp.getUTCMonth() + 1).toString();
        let day = timestamp.getUTCDate().toString();
        
        // Using padStart method to add leading zeroes where necessary
        string = `${year}-${month.padStart(2, 0)}-${day.padStart(2, 0)}`;
        
    } else {
        for (let i = 0; i < 10; i++) {
            string = timestamp;
            dateArray.push(string[i]);
        }
        string = dateArray.join('');
    }
    return string
}

module.exports = getDate;