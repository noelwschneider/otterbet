const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

// request functions
const getBets = require('./requests/getBets');
const addBets = require('./requests/addBets');
const updateFunds = require('../entries/requests/updateFunds');
const getEntries = require('../entries/requests/getEntries');

// routes
router.get('/', (req, res) => {
    getBets(req, res);
})

router.post('/', async (req, res) => {
    const { betslip, user, entry, wagerSum } = req.body
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN')
        await addBets(betslip);
        await updateFunds(wagerSum, entry);
        const queryResponse = await getEntries(user);
        await connection.query('COMMIT');
        res.send(queryResponse);
    } catch (error) {
        console.log('catch triggered', error);
        await connection.query('ROLLBACK');
        res.sendStatus(500);
    } finally {
        connection.release();
    }
})

module.exports = router;