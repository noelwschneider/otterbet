CREATE ROLE me WITH
SUPERUSER
CREATEDB
NOCREATEROLE
NOINHERIT
LOGIN
NOREPLICATION
NOBYPASSRLS
CONNECTION LIMIT -1;

-- Table for user data
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL
);

-- Table for game data from API-Sports
CREATE TABLE games (
    id integer PRIMARY KEY,
    date date,
    time time without time zone,
    stage character varying(100),
    league character varying(20),
    season integer,
    status character varying(20),
    timer character varying(20),
    home character varying(50),
    home_score integer,
    away character varying(50),
    away_score integer,
    home_1q integer,
    home_2q integer,
    home_3q integer,
    home_4q integer,
    home_overtime integer,
    away_1q integer,
    away_2q integer,
    away_3q integer,
    away_4q integer,
    away_overtime integer,
    venue_city character varying(100),
    venue_name character varying(100),
    home_inning_1 integer,
    home_inning_2 integer,
    home_inning_3 integer,
    home_inning_4 integer,
    home_inning_5 integer,
    home_inning_6 integer,
    home_inning_7 integer,
    home_inning_8 integer,
    home_inning_9 integer,
    home_extra_innings integer,
    away_inning_1 integer,
    away_inning_2 integer,
    away_inning_3 integer,
    away_inning_4 integer,
    away_inning_5 integer,
    away_inning_6 integer,
    away_inning_7 integer,
    away_inning_8 integer,
    away_inning_9 integer,
    away_extra_innings integer
);

-- Table for bookmaker data from odds-api
CREATE TABLE markets (
    id SERIAL PRIMARY KEY,
    bookmaker character varying(60) NOT NULL,
    outcome character varying(60) NOT NULL,
    market character varying(20) NOT NULL,
    point numeric,
    price numeric NOT NULL,
    last_update timestamp without time zone NOT NULL,
    result boolean,
    game_id integer REFERENCES games(id),
    market_string character varying(50)
);

-- Table for storing user bets
CREATE TABLE bets (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES "user"(id),
    market_id integer NOT NULL REFERENCES markets(id),
    wager numeric NOT NULL,
    bet_timestamp time with time zone,
    entry_id integer REFERENCES entries(id)
);

-- Table for storing public and private contests
    -- This mechanic is largely invisible to the user at this stage in development
    -- It is intended to feature prominently in future updates
CREATE TABLE contests (
    id character varying PRIMARY KEY,
    "type" character varying(25) NOT NULL,
    nfl boolean NOT NULL,
    ncaa_fb boolean NOT NULL,
    nba boolean NOT NULL,
    wnba boolean NOT NULL,
    ncaa_mbb boolean NOT NULL,
    ncaa_wbb boolean NOT NULL,
    mlb boolean NOT NULL,
    nhl boolean NOT NULL,
    epl boolean NOT NULL,
    spreads boolean NOT NULL,
    h2h boolean NOT NULL,
    over_under boolean NOT NULL,
    contest_start date NOT NULL,
    period_duration interval,
    period_count integer,
    period_fund numeric,
    max_users integer,
    min_wager numeric
);

-- Table for storing user entries
CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    name character varying(100),
    funds numeric NOT NULL,
    default_entry boolean NOT NULL,
    user_id integer REFERENCES "user"(id),
    contest_id character varying(50) REFERENCES contests(id)
);

