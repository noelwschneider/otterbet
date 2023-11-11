const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
    let placeholderString = '';
    let counter = 1;
    let colsArray = [];
    let queryValues = [];
    for (let property in req.body) {
        colsArray.push(property)
        queryValues.push(req.body[property]);
        placeholderString = placeholderString + `$${counter},`;
        counter++;
    }
    placeholderString = placeholderString.slice(0, -1); // Removing last comma
    
    let colsString = '"' + colsArray.join(`", "`) + '"';

    const queryText = `
        INSERT INTO contests (
            ${colsString}
        )
        VALUES (${placeholderString})
        ;
    `

    pool.query(queryText, queryValues)
    .then( response => {
        res.sendStatus(200)
    })
    .catch( error => {
        console.log('error in contest pool post:', error)
        res.sendStatus(500)
    })
})


module.exports = router;