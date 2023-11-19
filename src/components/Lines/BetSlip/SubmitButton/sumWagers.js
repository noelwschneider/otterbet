

export default function sum(array) {
    // validate that user has entered a value > 0 in each input field
    let sum = 0;
    for (let item of array) {
        sum += Number(item.wager);
    }
    return sum;
}