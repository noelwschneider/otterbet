import sum from './sumWagers';

export default function validate(betslip, funds) {
    const wagerSum = sum(betslip);

    // validate that user has entered a value > 0 in each input field
    for (let bet of betslip) {
        if (bet.wager <= 0) {
            //& render the alert to the DOM
            return false;
        }
    }

    // Validate that user has funds to place current wagers
    if (wagerSum > funds) {
        //& Render the appropriate alert to the DOM
        return false;
    }
    return true;
}