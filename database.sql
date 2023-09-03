--- Creating tables

-- The first three tables are directories.
	-- They do not have a purpose at base funcitonality
	-- As I implement filtering and customization features, they will be very useful
CREATE TABLE competitions (
    api_key varchar(60) PRIMARY KEY,
    title varchar(20) UNIQUE NOT NULL
);

CREATE TABLE bookmakers (
    api_key varchar(60) PRIMARY KEY,
    title varchar(60) NOT NULL
);

CREATE TABLE teams (
    id integer PRIMARY KEY,
    full_name varchar(60) UNIQUE NOT NULL,
    city varchar(30) NOT NULL,
    nickname varchar(30) NOT NULL
);

-- The following tables are the essential parts
CREATE TABLE "user" (
    id serial PRIMARY KEY,
    username varchar(80) UNIQUE NOT NULL,
    password varchar(1000) NOT NULL
);

CREATE TABLE games (
    id varchar(200) PRIMARY KEY,
    home_team varchar NOT NULL,
    away_team varchar NOT NULL,
    commence_time timestamp NOT NULL,
    competition varchar(100) NOT NULL,
    FOREIGN KEY (home_team) REFERENCES teams(full_name),
    FOREIGN KEY (away_team) REFERENCES teams(full_name),
    FOREIGN KEY (competition) REFERENCES competitions(api_key)
);

CREATE TABLE markets (
    id serial PRIMARY KEY,
    bookmaker varchar(60) NOT NULL,
    game_id varchar(100) NOT NULL,
    outcome varchar(60) NOT NULL,
    market varchar(20) NOT NULL,
    point integer,
    price integer NOT NULL,
    last_update timestamp NOT NULL,
    FOREIGN KEY (bookmaker) REFERENCES bookmakers(api_key),
    FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE TABLE bets (
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    market integer NOT NULL,
    wager integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id),
    FOREIGN KEY (market) REFERENCES markets(id)
);