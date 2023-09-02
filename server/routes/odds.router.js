const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

//! Add reject unauthenticated when this is working?
router.get('/', (req, res) => {
    console.groupCollapsed()
        console.log('in odds.router GET')
        console.log('req.body:', req.body)
        console.log('req.user:', req.user)
    console.groupEnd()
    
    res.send('hi')
})

module.exports = router;