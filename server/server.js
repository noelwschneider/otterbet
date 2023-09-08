const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const marketsRouter = require('./routes/markets.router');
const sportsRouter = require('./routes/sports.router')
const oddsRouter = require('./routes/odds.router')
const entriesRouter = require('./routes/entries.router')
const betsRouter = require('./routes/bets.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/markets', marketsRouter);
app.use('/api/odds', oddsRouter);
app.use('/api/sports', sportsRouter);
app.use('/api/entries', entriesRouter);
app.use('/api/bets', betsRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
