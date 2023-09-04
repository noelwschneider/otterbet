const express = require('express');
const axios = require('axios')

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

const APIKey = process.env.SPORTS_API_KEY

router.get('/', (req, res) => {
    console.log(APIKey)
    // req.headers['x-apisports-key'] = APIKey

    const config = {
        headers: {
            'x-apisports-key': APIKey
        }
    }

    console.log(req.headers)

    axios.get('https://v1.american-football.api-sports.io/games?league=1&season=2023', config)
        .then( response => {
            console.log('response:', response.data)
            res.send(response.data.response)
        })
        .catch( error => {
            console.log('error in scores GET:', error)
            res.sendStatus(500)
        })
})

module.exports = router;