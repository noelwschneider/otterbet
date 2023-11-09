// Express
const express = require('express');
const sessionMiddleware = require('./modules/session-middleware');
const app = express();

// Middleware
app.use(sessionMiddleware);

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport
const passport = require('./strategies/user.strategy');
app.use(passport.initialize());
app.use(passport.session());

// Routers
const userRouter = require('./routes/user.router');
const marketsRouter = require('./routes/markets.router');
const scoresRouter = require('./routes/scores.router');
const oddsRouter = require('./routes/odds.router');
const entriesRouter = require('./routes/entries/entries.router');
const betsRouter = require('./routes/bets/bets.router');
const contestsRouter = require('./routes/contests.router');

// Routes
app.use('/api/user', userRouter);
app.use('/api/markets', marketsRouter);
app.use('/api/odds', oddsRouter);
app.use('/api/scores', scoresRouter);
app.use('/api/entries', entriesRouter);
app.use('/api/bets', betsRouter);
app.use('/api/contests', contestsRouter);

// Serve static files
app.use(express.static('build'));

// Port
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
