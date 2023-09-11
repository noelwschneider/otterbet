--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-09-10 23:57:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 16701)
-- Name: bets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bets (
    id integer NOT NULL,
    user_id integer NOT NULL,
    market_id integer NOT NULL,
    wager numeric NOT NULL,
    bet_timestamp time with time zone
);


ALTER TABLE public.bets OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16700)
-- Name: bets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bets_id_seq OWNER TO postgres;

--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 223
-- Name: bets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bets_id_seq OWNED BY public.bets.id;


--
-- TOC entry 218 (class 1259 OID 16612)
-- Name: bookmakers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookmakers (
    api_key character varying(60) NOT NULL,
    title character varying(60) NOT NULL
);


ALTER TABLE public.bookmakers OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16605)
-- Name: competitions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competitions (
    api_key character varying(60) NOT NULL,
    title character varying(20) NOT NULL
);


ALTER TABLE public.competitions OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16654)
-- Name: contests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contests (
    id character varying NOT NULL,
    type character varying(25) NOT NULL,
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


ALTER TABLE public.contests OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16653)
-- Name: contests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contests_id_seq OWNER TO postgres;

--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 219
-- Name: contests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contests_id_seq OWNED BY public.contests.id;


--
-- TOC entry 222 (class 1259 OID 16663)
-- Name: entries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entries (
    id integer NOT NULL,
    name character varying(100),
    funds integer NOT NULL,
    default_entry boolean NOT NULL,
    user_id integer,
    contest_id character varying(50)
);


ALTER TABLE public.entries OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16662)
-- Name: entries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.entries_id_seq OWNER TO postgres;

--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 221
-- Name: entries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entries_id_seq OWNED BY public.entries.id;


--
-- TOC entry 227 (class 1259 OID 16732)
-- Name: games; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.games (
    id character varying(200) NOT NULL,
    api_sports_id integer,
    date date,
    "time" time without time zone,
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
    venue_name character varying(100)
);


ALTER TABLE public.games OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16721)
-- Name: markets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.markets (
    id integer NOT NULL,
    bookmaker character varying(60) NOT NULL,
    game_id character varying(100) NOT NULL,
    outcome character varying(60) NOT NULL,
    market character varying(20) NOT NULL,
    point numeric,
    price numeric NOT NULL,
    last_update timestamp without time zone NOT NULL
);


ALTER TABLE public.markets OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16720)
-- Name: markets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.markets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.markets_id_seq OWNER TO postgres;

--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 225
-- Name: markets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.markets_id_seq OWNED BY public.markets.id;


--
-- TOC entry 216 (class 1259 OID 16598)
-- Name: teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teams (
    id character varying(20) NOT NULL,
    full_name character varying(60) NOT NULL,
    city character varying(30) NOT NULL,
    nickname character varying(30) NOT NULL,
    abbreviated character varying(10),
    competition character varying(10),
    sports_api_id integer
);


ALTER TABLE public.teams OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16588)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(80) NOT NULL,
    password character varying(1000) NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16587)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 214
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 3211 (class 2604 OID 16704)
-- Name: bets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bets ALTER COLUMN id SET DEFAULT nextval('public.bets_id_seq'::regclass);


--
-- TOC entry 3210 (class 2604 OID 16666)
-- Name: entries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries ALTER COLUMN id SET DEFAULT nextval('public.entries_id_seq'::regclass);


--
-- TOC entry 3212 (class 2604 OID 16724)
-- Name: markets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.markets ALTER COLUMN id SET DEFAULT nextval('public.markets_id_seq'::regclass);


--
-- TOC entry 3209 (class 2604 OID 16591)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3393 (class 0 OID 16701)
-- Dependencies: 224
-- Data for Name: bets; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3387 (class 0 OID 16612)
-- Dependencies: 218
-- Data for Name: bookmakers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3386 (class 0 OID 16605)
-- Dependencies: 217
-- Data for Name: competitions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3389 (class 0 OID 16654)
-- Dependencies: 220
-- Data for Name: contests; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contests VALUES ('22_Mon, 11 Sep 2023 04:15:44 GMT', 'league', true, true, true, true, true, true, true, true, true, true, true, true, '2023-08-11', '7 days', 0, 1000, 1, 0);


--
-- TOC entry 3391 (class 0 OID 16663)
-- Dependencies: 222
-- Data for Name: entries; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3396 (class 0 OID 16732)
-- Dependencies: 227
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.games VALUES ('NFL_Kansas_City_Chiefs_Detroit_Lions_2023-09-08_00:20', 7532, '2023-09-08', '00:20:00', 'Regular Season', 'NFL', 2023, 'FT', NULL, 'Kansas City Chiefs', 20, 'Detroit Lions', 21, 0, 14, 3, 3, NULL, 7, 0, 7, 7, NULL, 'Kansas City', 'GEHA Field at Arrowhead Stadium');
INSERT INTO public.games VALUES ('NFL_Atlanta_Falcons_Carolina_Panthers_2023-09-10_17:00', 7533, '2023-09-10', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Atlanta Falcons', NULL, 'Carolina Panthers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Atlanta', 'Mercedes-Benz Stadium');
INSERT INTO public.games VALUES ('NFL_Cleveland_Browns_Cincinnati_Bengals_2023-09-10_17:00', 7534, '2023-09-10', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cleveland Browns', NULL, 'Cincinnati Bengals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cleveland', 'Cleveland Browns Stadium');
INSERT INTO public.games VALUES ('NFL_Pittsburgh_Steelers_San_Francisco_49ers_2023-09-10_17:00', 7538, '2023-09-10', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Pittsburgh Steelers', NULL, 'San Francisco 49ers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Pittsburgh', 'Acrisure Stadium');
INSERT INTO public.games VALUES ('NFL_Indianapolis_Colts_Jacksonville_Jaguars_2023-09-10_17:00', 7535, '2023-09-10', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Indianapolis Colts', NULL, 'Jacksonville Jaguars', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Indianapolis', 'Lucas Oil Stadium');
INSERT INTO public.games VALUES ('NFL_Minnesota_Vikings_Tampa_Bay_Buccaneers_2023-09-10_17:00', 7536, '2023-09-10', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Minnesota Vikings', NULL, 'Tampa Bay Buccaneers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Minneapolis', 'U.S. Bank Stadium');
INSERT INTO public.games VALUES ('NFL_New_Orleans_Saints_Tennessee_Titans_2023-09-10_17:00', 7537, '2023-09-10', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New Orleans Saints', NULL, 'Tennessee Titans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'New Orleans', 'Caesars Superdome');
INSERT INTO public.games VALUES ('NFL_Washington_Commanders_Arizona_Cardinals_2023-09-10_17:00', 7539, '2023-09-10', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Washington Commanders', NULL, 'Arizona Cardinals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Landover', 'FedExField');
INSERT INTO public.games VALUES ('NFL_Baltimore_Ravens_Houston_Texans_2023-09-10_17:00', 7540, '2023-09-10', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Baltimore Ravens', NULL, 'Houston Texans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Baltimore', 'M&T Bank Stadium');
INSERT INTO public.games VALUES ('NFL_Chicago_Bears_Green_Bay_Packers_2023-09-10_20:25', 7541, '2023-09-10', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Chicago Bears', NULL, 'Green Bay Packers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Chicago', 'Soldier Field');
INSERT INTO public.games VALUES ('NFL_Denver_Broncos_Las_Vegas_Raiders_2023-09-10_20:25', 7542, '2023-09-10', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Denver Broncos', NULL, 'Las Vegas Raiders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Denver', 'Empower Field at Mile High');
INSERT INTO public.games VALUES ('NFL_New_England_Patriots_Philadelphia_Eagles_2023-09-10_20:25', 7543, '2023-09-10', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New England Patriots', NULL, 'Philadelphia Eagles', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Foxborough', 'Gillette Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Chargers_Miami_Dolphins_2023-09-10_20:25', 7544, '2023-09-10', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Chargers', NULL, 'Miami Dolphins', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_Seattle_Seahawks_Los_Angeles_Rams_2023-09-10_20:25', 7545, '2023-09-10', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Seattle Seahawks', NULL, 'Los Angeles Rams', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Seattle', 'Lumen Field');
INSERT INTO public.games VALUES ('NFL_New_York_Giants_Dallas_Cowboys_2023-09-11_00:20', 7546, '2023-09-11', '00:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Giants', NULL, 'Dallas Cowboys', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Jets_Buffalo_Bills_2023-09-12_00:15', 7547, '2023-09-12', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Jets', NULL, 'Buffalo Bills', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_Philadelphia_Eagles_Minnesota_Vikings_2023-09-15_00:15', 7548, '2023-09-15', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Philadelphia Eagles', NULL, 'Minnesota Vikings', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Philadelphia', 'Lincoln Financial Field');
INSERT INTO public.games VALUES ('NFL_Atlanta_Falcons_Green_Bay_Packers_2023-09-17_17:00', 7549, '2023-09-17', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Atlanta Falcons', NULL, 'Green Bay Packers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Atlanta', 'Mercedes-Benz Stadium');
INSERT INTO public.games VALUES ('NFL_Buffalo_Bills_Las_Vegas_Raiders_2023-09-17_17:00', 7550, '2023-09-17', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Buffalo Bills', NULL, 'Las Vegas Raiders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Orchard Park', 'Highmark Stadium');
INSERT INTO public.games VALUES ('NFL_Cincinnati_Bengals_Baltimore_Ravens_2023-09-17_17:00', 7551, '2023-09-17', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cincinnati Bengals', NULL, 'Baltimore Ravens', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cincinnati', 'Paycor Stadium');
INSERT INTO public.games VALUES ('NFL_Detroit_Lions_Seattle_Seahawks_2023-09-17_17:00', 7552, '2023-09-17', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Detroit Lions', NULL, 'Seattle Seahawks', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Detroit', 'Ford Field');
INSERT INTO public.games VALUES ('NFL_Tennessee_Titans_Los_Angeles_Chargers_2023-09-17_17:00', 7553, '2023-09-17', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tennessee Titans', NULL, 'Los Angeles Chargers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nashville', 'Nissan Stadium');
INSERT INTO public.games VALUES ('NFL_Tampa_Bay_Buccaneers_Chicago_Bears_2023-09-17_17:00', 7554, '2023-09-17', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tampa Bay Buccaneers', NULL, 'Chicago Bears', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tampa', 'Raymond James Stadium');
INSERT INTO public.games VALUES ('NFL_Jacksonville_Jaguars_Kansas_City_Chiefs_2023-09-17_17:00', 7555, '2023-09-17', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Jacksonville Jaguars', NULL, 'Kansas City Chiefs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Jacksonville', 'EverBank Stadium');
INSERT INTO public.games VALUES ('NFL_Houston_Texans_Indianapolis_Colts_2023-09-17_17:00', 7556, '2023-09-17', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Houston Texans', NULL, 'Indianapolis Colts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Houston', 'NRG Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Rams_San_Francisco_49ers_2023-09-17_20:05', 7557, '2023-09-17', '20:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Rams', NULL, 'San Francisco 49ers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_Arizona_Cardinals_New_York_Giants_2023-09-17_20:05', 7558, '2023-09-17', '20:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Arizona Cardinals', NULL, 'New York Giants', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Glendale', 'State Farm Stadium');
INSERT INTO public.games VALUES ('NFL_Dallas_Cowboys_New_York_Jets_2023-09-17_20:25', 7559, '2023-09-17', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Dallas Cowboys', NULL, 'New York Jets', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Arlington', 'AT&T Stadium');
INSERT INTO public.games VALUES ('NFL_Denver_Broncos_Washington_Commanders_2023-09-17_20:25', 7560, '2023-09-17', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Denver Broncos', NULL, 'Washington Commanders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Denver', 'Empower Field at Mile High');
INSERT INTO public.games VALUES ('NFL_New_England_Patriots_Miami_Dolphins_2023-09-18_00:20', 7561, '2023-09-18', '00:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New England Patriots', NULL, 'Miami Dolphins', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Foxborough', 'Gillette Stadium');
INSERT INTO public.games VALUES ('NFL_Carolina_Panthers_New_Orleans_Saints_2023-09-18_23:15', 7562, '2023-09-18', '23:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Carolina Panthers', NULL, 'New Orleans Saints', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Charlotte', 'Bank of America Stadium');
INSERT INTO public.games VALUES ('NFL_Pittsburgh_Steelers_Cleveland_Browns_2023-09-19_00:15', 7563, '2023-09-19', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Pittsburgh Steelers', NULL, 'Cleveland Browns', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Pittsburgh', 'Acrisure Stadium');
INSERT INTO public.games VALUES ('NFL_San_Francisco_49ers_New_York_Giants_2023-09-22_00:15', 7564, '2023-09-22', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'San Francisco 49ers', NULL, 'New York Giants', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Santa Clara', 'Levi''s Stadium');
INSERT INTO public.games VALUES ('NFL_Cleveland_Browns_Tennessee_Titans_2023-09-24_17:00', 7565, '2023-09-24', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cleveland Browns', NULL, 'Tennessee Titans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cleveland', 'Cleveland Browns Stadium');
INSERT INTO public.games VALUES ('NFL_Detroit_Lions_Atlanta_Falcons_2023-09-24_17:00', 7566, '2023-09-24', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Detroit Lions', NULL, 'Atlanta Falcons', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Detroit', 'Ford Field');
INSERT INTO public.games VALUES ('NFL_Green_Bay_Packers_New_Orleans_Saints_2023-09-24_17:00', 7567, '2023-09-24', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Green Bay Packers', NULL, 'New Orleans Saints', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Green Bay', 'Lambeau Field');
INSERT INTO public.games VALUES ('NFL_Miami_Dolphins_Denver_Broncos_2023-09-24_17:00', 7568, '2023-09-24', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Miami Dolphins', NULL, 'Denver Broncos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Miami Gardens', 'Hard Rock Stadium');
INSERT INTO public.games VALUES ('NFL_Minnesota_Vikings_Los_Angeles_Chargers_2023-09-24_17:00', 7569, '2023-09-24', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Minnesota Vikings', NULL, 'Los Angeles Chargers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Minneapolis', 'U.S. Bank Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Jets_New_England_Patriots_2023-09-24_17:00', 7570, '2023-09-24', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Jets', NULL, 'New England Patriots', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_Washington_Commanders_Buffalo_Bills_2023-09-24_17:00', 7571, '2023-09-24', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Washington Commanders', NULL, 'Buffalo Bills', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Landover', 'FedExField');
INSERT INTO public.games VALUES ('NFL_Jacksonville_Jaguars_Houston_Texans_2023-09-24_17:00', 7572, '2023-09-24', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Jacksonville Jaguars', NULL, 'Houston Texans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Jacksonville', 'EverBank Stadium');
INSERT INTO public.games VALUES ('NFL_Baltimore_Ravens_Indianapolis_Colts_2023-09-24_17:00', 7573, '2023-09-24', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Baltimore Ravens', NULL, 'Indianapolis Colts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Baltimore', 'M&T Bank Stadium');
INSERT INTO public.games VALUES ('NFL_Seattle_Seahawks_Carolina_Panthers_2023-09-24_20:05', 7574, '2023-09-24', '20:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Seattle Seahawks', NULL, 'Carolina Panthers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Seattle', 'Lumen Field');
INSERT INTO public.games VALUES ('NFL_Kansas_City_Chiefs_Chicago_Bears_2023-09-24_20:25', 7575, '2023-09-24', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Kansas City Chiefs', NULL, 'Chicago Bears', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kansas City', 'GEHA Field at Arrowhead Stadium');
INSERT INTO public.games VALUES ('NFL_Arizona_Cardinals_Dallas_Cowboys_2023-09-24_20:25', 7576, '2023-09-24', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Arizona Cardinals', NULL, 'Dallas Cowboys', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Glendale', 'State Farm Stadium');
INSERT INTO public.games VALUES ('NFL_Tampa_Bay_Buccaneers_Philadelphia_Eagles_2023-09-25_23:15', 7578, '2023-09-25', '23:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tampa Bay Buccaneers', NULL, 'Philadelphia Eagles', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tampa', 'Raymond James Stadium');
INSERT INTO public.games VALUES ('NFL_Cincinnati_Bengals_Los_Angeles_Rams_2023-09-26_00:15', 7579, '2023-09-26', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cincinnati Bengals', NULL, 'Los Angeles Rams', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cincinnati', 'Paycor Stadium');
INSERT INTO public.games VALUES ('NFL_Chicago_Bears_Denver_Broncos_2023-10-01_17:00', 7583, '2023-10-01', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Chicago Bears', NULL, 'Denver Broncos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Chicago', 'Soldier Field');
INSERT INTO public.games VALUES ('NFL_Indianapolis_Colts_Los_Angeles_Rams_2023-10-01_17:00', 7586, '2023-10-01', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Indianapolis Colts', NULL, 'Los Angeles Rams', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Indianapolis', 'Lucas Oil Stadium');
INSERT INTO public.games VALUES ('NFL_New_Orleans_Saints_Tampa_Bay_Buccaneers_2023-10-01_17:00', 7587, '2023-10-01', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New Orleans Saints', NULL, 'Tampa Bay Buccaneers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'New Orleans', 'Caesars Superdome');
INSERT INTO public.games VALUES ('NFL_Philadelphia_Eagles_Washington_Commanders_2023-10-01_17:00', 7588, '2023-10-01', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Philadelphia Eagles', NULL, 'Washington Commanders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Philadelphia', 'Lincoln Financial Field');
INSERT INTO public.games VALUES ('NFL_Houston_Texans_Pittsburgh_Steelers_2023-10-01_17:00', 7590, '2023-10-01', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Houston Texans', NULL, 'Pittsburgh Steelers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Houston', 'NRG Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Chargers_Las_Vegas_Raiders_2023-10-01_20:05', 7591, '2023-10-01', '20:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Chargers', NULL, 'Las Vegas Raiders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Giants_Seattle_Seahawks_2023-10-03_00:15', 7595, '2023-10-03', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Giants', NULL, 'Seattle Seahawks', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_Atlanta_Falcons_Houston_Texans_2023-10-08_17:00', 7598, '2023-10-08', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Atlanta Falcons', NULL, 'Houston Texans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Atlanta', 'Mercedes-Benz Stadium');
INSERT INTO public.games VALUES ('NFL_Detroit_Lions_Carolina_Panthers_2023-10-08_17:00', 7599, '2023-10-08', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Detroit Lions', NULL, 'Carolina Panthers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Detroit', 'Ford Field');
INSERT INTO public.games VALUES ('NFL_Indianapolis_Colts_Tennessee_Titans_2023-10-08_17:00', 7600, '2023-10-08', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Indianapolis Colts', NULL, 'Tennessee Titans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Indianapolis', 'Lucas Oil Stadium');
INSERT INTO public.games VALUES ('NFL_Pittsburgh_Steelers_Baltimore_Ravens_2023-10-08_17:00', 7602, '2023-10-08', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Pittsburgh Steelers', NULL, 'Baltimore Ravens', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Pittsburgh', 'Acrisure Stadium');
INSERT INTO public.games VALUES ('NFL_Miami_Dolphins_New_York_Giants_2023-10-08_17:00', 7847, '2023-10-08', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Miami Dolphins', NULL, 'New York Giants', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Miami Gardens', 'Hard Rock Stadium');
INSERT INTO public.games VALUES ('NFL_Minnesota_Vikings_Kansas_City_Chiefs_2023-10-08_20:25', 7605, '2023-10-08', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Minnesota Vikings', NULL, 'Kansas City Chiefs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Minneapolis', 'U.S. Bank Stadium');
INSERT INTO public.games VALUES ('NFL_Houston_Texans_New_Orleans_Saints_2023-10-15_17:00', 7617, '2023-10-15', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Houston Texans', NULL, 'New Orleans Saints', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Houston', 'NRG Stadium');
INSERT INTO public.games VALUES ('NFL_Las_Vegas_Raiders_New_England_Patriots_2023-10-15_20:05', 7618, '2023-10-15', '20:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Las Vegas Raiders', NULL, 'New England Patriots', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Las Vegas', 'Allegiant Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Chargers_Dallas_Cowboys_2023-10-17_00:15', 7622, '2023-10-17', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Chargers', NULL, 'Dallas Cowboys', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_Indianapolis_Colts_Cleveland_Browns_2023-10-22_17:00', 7625, '2023-10-22', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Indianapolis Colts', NULL, 'Cleveland Browns', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Indianapolis', 'Lucas Oil Stadium');
INSERT INTO public.games VALUES ('NFL_Tampa_Bay_Buccaneers_Atlanta_Falcons_2023-10-22_17:00', 7628, '2023-10-22', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tampa Bay Buccaneers', NULL, 'Atlanta Falcons', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tampa', 'Raymond James Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Rams_Pittsburgh_Steelers_2023-10-22_20:05', 7630, '2023-10-22', '20:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Rams', NULL, 'Pittsburgh Steelers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_Miami_Dolphins_New_England_Patriots_2023-10-29_17:00', 7641, '2023-10-29', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Miami Dolphins', NULL, 'New England Patriots', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Miami Gardens', 'Hard Rock Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Chargers_Chicago_Bears_2023-10-30_00:20', 7650, '2023-10-30', '00:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Chargers', NULL, 'Chicago Bears', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_Detroit_Lions_Las_Vegas_Raiders_2023-10-31_00:15', 7651, '2023-10-31', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Detroit Lions', NULL, 'Las Vegas Raiders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Detroit', 'Ford Field');
INSERT INTO public.games VALUES ('NFL_Cleveland_Browns_Arizona_Cardinals_2023-11-05_18:00', 7655, '2023-11-05', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cleveland Browns', NULL, 'Arizona Cardinals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cleveland', 'Cleveland Browns Stadium');
INSERT INTO public.games VALUES ('NFL_Green_Bay_Packers_Los_Angeles_Rams_2023-11-05_18:00', 7656, '2023-11-05', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Green Bay Packers', NULL, 'Los Angeles Rams', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Green Bay', 'Lambeau Field');
INSERT INTO public.games VALUES ('NFL_New_England_Patriots_Washington_Commanders_2023-11-05_18:00', 7657, '2023-11-05', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New England Patriots', NULL, 'Washington Commanders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Foxborough', 'Gillette Stadium');
INSERT INTO public.games VALUES ('NFL_Baltimore_Ravens_Seattle_Seahawks_2023-11-05_18:00', 7659, '2023-11-05', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Baltimore Ravens', NULL, 'Seattle Seahawks', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Baltimore', 'M&T Bank Stadium');
INSERT INTO public.games VALUES ('NFL_Houston_Texans_Tampa_Bay_Buccaneers_2023-11-05_18:00', 7660, '2023-11-05', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Houston Texans', NULL, 'Tampa Bay Buccaneers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Houston', 'NRG Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Jets_Los_Angeles_Chargers_2023-11-07_01:15', 7665, '2023-11-07', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Jets', NULL, 'Los Angeles Chargers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_New_England_Patriots_Indianapolis_Colts_2023-11-12_14:30', 7667, '2023-11-12', '14:30:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New England Patriots', NULL, 'Indianapolis Colts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Frankfurt', 'Frankfurt Stadium');
INSERT INTO public.games VALUES ('NFL_Pittsburgh_Steelers_Green_Bay_Packers_2023-11-12_18:00', 7670, '2023-11-12', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Pittsburgh Steelers', NULL, 'Green Bay Packers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Pittsburgh', 'Acrisure Stadium');
INSERT INTO public.games VALUES ('NFL_Jacksonville_Jaguars_San_Francisco_49ers_2023-11-12_18:00', 7672, '2023-11-12', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Jacksonville Jaguars', NULL, 'San Francisco 49ers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Jacksonville', 'EverBank Stadium');
INSERT INTO public.games VALUES ('NFL_Las_Vegas_Raiders_Pittsburgh_Steelers_2023-09-25_00:20', 7577, '2023-09-25', '00:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Las Vegas Raiders', NULL, 'Pittsburgh Steelers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Las Vegas', 'Allegiant Stadium');
INSERT INTO public.games VALUES ('NFL_Green_Bay_Packers_Detroit_Lions_2023-09-29_00:15', 7580, '2023-09-29', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Green Bay Packers', NULL, 'Detroit Lions', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Green Bay', 'Lambeau Field');
INSERT INTO public.games VALUES ('NFL_Jacksonville_Jaguars_Atlanta_Falcons_2023-10-01_13:30', 7581, '2023-10-01', '13:30:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Jacksonville Jaguars', NULL, 'Atlanta Falcons', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'London', 'Wembley Stadium');
INSERT INTO public.games VALUES ('NFL_Buffalo_Bills_Miami_Dolphins_2023-10-01_17:00', 7582, '2023-10-01', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Buffalo Bills', NULL, 'Miami Dolphins', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Orchard Park', 'Highmark Stadium');
INSERT INTO public.games VALUES ('NFL_Cleveland_Browns_Baltimore_Ravens_2023-10-01_17:00', 7584, '2023-10-01', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cleveland Browns', NULL, 'Baltimore Ravens', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cleveland', 'Cleveland Browns Stadium');
INSERT INTO public.games VALUES ('NFL_Tennessee_Titans_Cincinnati_Bengals_2023-10-01_17:00', 7585, '2023-10-01', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tennessee Titans', NULL, 'Cincinnati Bengals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nashville', 'Nissan Stadium');
INSERT INTO public.games VALUES ('NFL_Carolina_Panthers_Minnesota_Vikings_2023-10-01_17:00', 7589, '2023-10-01', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Carolina Panthers', NULL, 'Minnesota Vikings', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Charlotte', 'Bank of America Stadium');
INSERT INTO public.games VALUES ('NFL_Dallas_Cowboys_New_England_Patriots_2023-10-01_20:25', 7592, '2023-10-01', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Dallas Cowboys', NULL, 'New England Patriots', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Arlington', 'AT&T Stadium');
INSERT INTO public.games VALUES ('NFL_San_Francisco_49ers_Arizona_Cardinals_2023-10-01_20:25', 7593, '2023-10-01', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'San Francisco 49ers', NULL, 'Arizona Cardinals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Santa Clara', 'Levi''s Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Jets_Kansas_City_Chiefs_2023-10-02_00:20', 7594, '2023-10-02', '00:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Jets', NULL, 'Kansas City Chiefs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_Washington_Commanders_Chicago_Bears_2023-10-06_00:15', 7596, '2023-10-06', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Washington Commanders', NULL, 'Chicago Bears', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Landover', 'FedExField');
INSERT INTO public.games VALUES ('NFL_Buffalo_Bills_Jacksonville_Jaguars_2023-10-08_13:30', 7597, '2023-10-08', '13:30:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Buffalo Bills', NULL, 'Jacksonville Jaguars', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'London', 'Tottenham Hotspur Stadium');
INSERT INTO public.games VALUES ('NFL_New_England_Patriots_New_Orleans_Saints_2023-10-08_17:00', 7601, '2023-10-08', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New England Patriots', NULL, 'New Orleans Saints', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Foxborough', 'Gillette Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Rams_Philadelphia_Eagles_2023-10-08_20:05', 7603, '2023-10-08', '20:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Rams', NULL, 'Philadelphia Eagles', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_Arizona_Cardinals_Cincinnati_Bengals_2023-10-08_20:05', 7604, '2023-10-08', '20:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Arizona Cardinals', NULL, 'Cincinnati Bengals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Glendale', 'State Farm Stadium');
INSERT INTO public.games VALUES ('NFL_San_Francisco_49ers_Dallas_Cowboys_2023-10-09_00:20', 7606, '2023-10-09', '00:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'San Francisco 49ers', NULL, 'Dallas Cowboys', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Santa Clara', 'Levi''s Stadium');
INSERT INTO public.games VALUES ('NFL_Las_Vegas_Raiders_Green_Bay_Packers_2023-10-10_00:15', 7607, '2023-10-10', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Las Vegas Raiders', NULL, 'Green Bay Packers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Las Vegas', 'Allegiant Stadium');
INSERT INTO public.games VALUES ('NFL_Chicago_Bears_Minnesota_Vikings_2023-10-15_17:00', 7611, '2023-10-15', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Chicago Bears', NULL, 'Minnesota Vikings', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Chicago', 'Soldier Field');
INSERT INTO public.games VALUES ('NFL_Miami_Dolphins_Carolina_Panthers_2023-10-15_17:00', 7614, '2023-10-15', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Miami Dolphins', NULL, 'Carolina Panthers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Miami Gardens', 'Hard Rock Stadium');
INSERT INTO public.games VALUES ('NFL_Tampa_Bay_Buccaneers_Detroit_Lions_2023-10-15_17:00', 7615, '2023-10-15', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tampa Bay Buccaneers', NULL, 'Detroit Lions', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tampa', 'Raymond James Stadium');
INSERT INTO public.games VALUES ('NFL_New_Orleans_Saints_Jacksonville_Jaguars_2023-10-20_00:15', 7623, '2023-10-20', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New Orleans Saints', NULL, 'Jacksonville Jaguars', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'New Orleans', 'Caesars Superdome');
INSERT INTO public.games VALUES ('NFL_Washington_Commanders_Philadelphia_Eagles_2023-10-29_17:00', 7644, '2023-10-29', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Washington Commanders', NULL, 'Philadelphia Eagles', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Landover', 'FedExField');
INSERT INTO public.games VALUES ('NFL_Carolina_Panthers_Houston_Texans_2023-10-29_17:00', 7645, '2023-10-29', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Carolina Panthers', NULL, 'Houston Texans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Charlotte', 'Bank of America Stadium');
INSERT INTO public.games VALUES ('NFL_Seattle_Seahawks_Cleveland_Browns_2023-10-29_20:05', 7646, '2023-10-29', '20:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Seattle Seahawks', NULL, 'Cleveland Browns', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Seattle', 'Lumen Field');
INSERT INTO public.games VALUES ('NFL_Arizona_Cardinals_Baltimore_Ravens_2023-10-29_20:25', 7648, '2023-10-29', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Arizona Cardinals', NULL, 'Baltimore Ravens', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Glendale', 'State Farm Stadium');
INSERT INTO public.games VALUES ('NFL_Seattle_Seahawks_Washington_Commanders_2023-11-12_21:25', 7677, '2023-11-12', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Seattle Seahawks', NULL, 'Washington Commanders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Seattle', 'Lumen Field');
INSERT INTO public.games VALUES ('NFL_Baltimore_Ravens_Cincinnati_Bengals_2023-11-17_01:15', 7680, '2023-11-17', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Baltimore Ravens', NULL, 'Cincinnati Bengals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Baltimore', 'M&T Bank Stadium');
INSERT INTO public.games VALUES ('NFL_Cleveland_Browns_Pittsburgh_Steelers_2023-11-19_18:00', 7681, '2023-11-19', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cleveland Browns', NULL, 'Pittsburgh Steelers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cleveland', 'Cleveland Browns Stadium');
INSERT INTO public.games VALUES ('NFL_Miami_Dolphins_Las_Vegas_Raiders_2023-11-19_18:00', 7684, '2023-11-19', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Miami Dolphins', NULL, 'Las Vegas Raiders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Miami Gardens', 'Hard Rock Stadium');
INSERT INTO public.games VALUES ('NFL_San_Francisco_49ers_Tampa_Bay_Buccaneers_2023-11-19_21:05', 7689, '2023-11-19', '21:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'San Francisco 49ers', NULL, 'Tampa Bay Buccaneers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Santa Clara', 'Levi''s Stadium');
INSERT INTO public.games VALUES ('NFL_Houston_Texans_Tennessee_Titans_2023-12-31_18:00', 7781, '2023-12-31', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Houston Texans', NULL, 'Tennessee Titans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Houston', 'NRG Stadium');
INSERT INTO public.games VALUES ('NFL_Cincinnati_Bengals_Cleveland_Browns_2024-01-07_00:00', 7786, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cincinnati Bengals', NULL, 'Cleveland Browns', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cincinnati', 'Paycor Stadium');
INSERT INTO public.games VALUES ('NFL_Green_Bay_Packers_Chicago_Bears_2024-01-07_00:00', 7788, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Green Bay Packers', NULL, 'Chicago Bears', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Green Bay', 'Lambeau Field');
INSERT INTO public.games VALUES ('NFL_Tennessee_Titans_Jacksonville_Jaguars_2024-01-07_00:00', 7789, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tennessee Titans', NULL, 'Jacksonville Jaguars', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nashville', 'Nissan Stadium');
INSERT INTO public.games VALUES ('NFL_Indianapolis_Colts_Houston_Texans_2024-01-07_00:00', 7790, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Indianapolis Colts', NULL, 'Houston Texans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Indianapolis', 'Lucas Oil Stadium');
INSERT INTO public.games VALUES ('NFL_Las_Vegas_Raiders_Denver_Broncos_2024-01-07_00:00', 7791, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Las Vegas Raiders', NULL, 'Denver Broncos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Las Vegas', 'Allegiant Stadium');
INSERT INTO public.games VALUES ('NFL_New_England_Patriots_New_York_Jets_2024-01-07_00:00', 7793, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New England Patriots', NULL, 'New York Jets', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Foxborough', 'Gillette Stadium');
INSERT INTO public.games VALUES ('NFL_New_Orleans_Saints_Atlanta_Falcons_2024-01-07_00:00', 7794, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New Orleans Saints', NULL, 'Atlanta Falcons', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'New Orleans', 'Caesars Superdome');
INSERT INTO public.games VALUES ('NFL_New_York_Giants_Philadelphia_Eagles_2024-01-07_00:00', 7795, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Giants', NULL, 'Philadelphia Eagles', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_Denver_Broncos_New_York_Jets_2023-10-08_20:25', 7848, '2023-10-08', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Denver Broncos', NULL, 'New York Jets', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Denver', 'Empower Field at Mile High');
INSERT INTO public.games VALUES ('NFL_Kansas_City_Chiefs_Denver_Broncos_2023-10-13_00:15', 7608, '2023-10-13', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Kansas City Chiefs', NULL, 'Denver Broncos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kansas City', 'GEHA Field at Arrowhead Stadium');
INSERT INTO public.games VALUES ('NFL_Tennessee_Titans_Baltimore_Ravens_2023-10-15_13:30', 7609, '2023-10-15', '13:30:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tennessee Titans', NULL, 'Baltimore Ravens', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'London', 'Tottenham Hotspur Stadium');
INSERT INTO public.games VALUES ('NFL_Atlanta_Falcons_Washington_Commanders_2023-10-15_17:00', 7610, '2023-10-15', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Atlanta Falcons', NULL, 'Washington Commanders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Atlanta', 'Mercedes-Benz Stadium');
INSERT INTO public.games VALUES ('NFL_Cincinnati_Bengals_Seattle_Seahawks_2023-10-15_17:00', 7612, '2023-10-15', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cincinnati Bengals', NULL, 'Seattle Seahawks', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cincinnati', 'Paycor Stadium');
INSERT INTO public.games VALUES ('NFL_Cleveland_Browns_San_Francisco_49ers_2023-10-15_17:00', 7613, '2023-10-15', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cleveland Browns', NULL, 'San Francisco 49ers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cleveland', 'Cleveland Browns Stadium');
INSERT INTO public.games VALUES ('NFL_Jacksonville_Jaguars_Indianapolis_Colts_2023-10-15_17:00', 7616, '2023-10-15', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Jacksonville Jaguars', NULL, 'Indianapolis Colts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Jacksonville', 'EverBank Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Rams_Arizona_Cardinals_2023-10-15_20:25', 7619, '2023-10-15', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Rams', NULL, 'Arizona Cardinals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Jets_Philadelphia_Eagles_2023-10-15_20:25', 7620, '2023-10-15', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Jets', NULL, 'Philadelphia Eagles', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_Buffalo_Bills_New_York_Giants_2023-10-16_00:20', 7621, '2023-10-16', '00:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Buffalo Bills', NULL, 'New York Giants', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Orchard Park', 'Highmark Stadium');
INSERT INTO public.games VALUES ('NFL_Chicago_Bears_Las_Vegas_Raiders_2023-10-22_17:00', 7624, '2023-10-22', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Chicago Bears', NULL, 'Las Vegas Raiders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Chicago', 'Soldier Field');
INSERT INTO public.games VALUES ('NFL_Denver_Broncos_Green_Bay_Packers_2023-10-22_20:25', 7632, '2023-10-22', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Denver Broncos', NULL, 'Green Bay Packers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Denver', 'Empower Field at Mile High');
INSERT INTO public.games VALUES ('NFL_Kansas_City_Chiefs_Los_Angeles_Chargers_2023-10-22_20:25', 7633, '2023-10-22', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Kansas City Chiefs', NULL, 'Los Angeles Chargers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kansas City', 'GEHA Field at Arrowhead Stadium');
INSERT INTO public.games VALUES ('NFL_Minnesota_Vikings_San_Francisco_49ers_2023-10-24_00:15', 7635, '2023-10-24', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Minnesota Vikings', NULL, 'San Francisco 49ers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Minneapolis', 'U.S. Bank Stadium');
INSERT INTO public.games VALUES ('NFL_Dallas_Cowboys_Los_Angeles_Rams_2023-10-29_17:00', 7637, '2023-10-29', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Dallas Cowboys', NULL, 'Los Angeles Rams', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Arlington', 'AT&T Stadium');
INSERT INTO public.games VALUES ('NFL_Indianapolis_Colts_New_Orleans_Saints_2023-10-29_17:00', 7640, '2023-10-29', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Indianapolis Colts', NULL, 'New Orleans Saints', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Indianapolis', 'Lucas Oil Stadium');
INSERT INTO public.games VALUES ('NFL_Pittsburgh_Steelers_Jacksonville_Jaguars_2023-10-29_17:00', 7643, '2023-10-29', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Pittsburgh Steelers', NULL, 'Jacksonville Jaguars', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Pittsburgh', 'Acrisure Stadium');
INSERT INTO public.games VALUES ('NFL_Denver_Broncos_Kansas_City_Chiefs_2023-10-29_20:25', 7647, '2023-10-29', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Denver Broncos', NULL, 'Kansas City Chiefs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Denver', 'Empower Field at Mile High');
INSERT INTO public.games VALUES ('NFL_Buffalo_Bills_Denver_Broncos_2023-11-14_01:15', 7679, '2023-11-14', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Buffalo Bills', NULL, 'Denver Broncos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Orchard Park', 'Highmark Stadium');
INSERT INTO public.games VALUES ('NFL_Detroit_Lions_Chicago_Bears_2023-11-19_18:00', 7682, '2023-11-19', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Detroit Lions', NULL, 'Chicago Bears', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Detroit', 'Ford Field');
INSERT INTO public.games VALUES ('NFL_Carolina_Panthers_Dallas_Cowboys_2023-11-19_18:00', 7686, '2023-11-19', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Carolina Panthers', NULL, 'Dallas Cowboys', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Charlotte', 'Bank of America Stadium');
INSERT INTO public.games VALUES ('NFL_Jacksonville_Jaguars_Tennessee_Titans_2023-11-19_18:00', 7687, '2023-11-19', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Jacksonville Jaguars', NULL, 'Tennessee Titans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Jacksonville', 'EverBank Stadium');
INSERT INTO public.games VALUES ('NFL_Buffalo_Bills_New_York_Jets_2023-11-19_21:25', 7690, '2023-11-19', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Buffalo Bills', NULL, 'New York Jets', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Orchard Park', 'Highmark Stadium');
INSERT INTO public.games VALUES ('NFL_Atlanta_Falcons_New_Orleans_Saints_2023-11-26_18:00', 7698, '2023-11-26', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Atlanta Falcons', NULL, 'New Orleans Saints', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Atlanta', 'Mercedes-Benz Stadium');
INSERT INTO public.games VALUES ('NFL_Cincinnati_Bengals_Pittsburgh_Steelers_2023-11-26_18:00', 7699, '2023-11-26', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cincinnati Bengals', NULL, 'Pittsburgh Steelers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cincinnati', 'Paycor Stadium');
INSERT INTO public.games VALUES ('NFL_New_Orleans_Saints_Detroit_Lions_2023-12-03_18:00', 7713, '2023-12-03', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New Orleans Saints', NULL, 'Detroit Lions', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'New Orleans', 'Caesars Superdome');
INSERT INTO public.games VALUES ('NFL_Tampa_Bay_Buccaneers_Carolina_Panthers_2023-12-03_18:00', 7716, '2023-12-03', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tampa Bay Buccaneers', NULL, 'Carolina Panthers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tampa', 'Raymond James Stadium');
INSERT INTO public.games VALUES ('NFL_Washington_Commanders_Miami_Dolphins_2023-12-03_18:00', 7717, '2023-12-03', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Washington Commanders', NULL, 'Miami Dolphins', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Landover', 'FedExField');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Rams_Cleveland_Browns_2023-12-03_21:25', 7719, '2023-12-03', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Rams', NULL, 'Cleveland Browns', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_Jacksonville_Jaguars_Cincinnati_Bengals_2023-12-05_01:15', 7722, '2023-12-05', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Jacksonville Jaguars', NULL, 'Cincinnati Bengals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Jacksonville', 'EverBank Stadium');
INSERT INTO public.games VALUES ('NFL_Pittsburgh_Steelers_New_England_Patriots_2023-12-08_01:15', 7723, '2023-12-08', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Pittsburgh Steelers', NULL, 'New England Patriots', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Pittsburgh', 'Acrisure Stadium');
INSERT INTO public.games VALUES ('NFL_Atlanta_Falcons_Tampa_Bay_Buccaneers_2023-12-10_18:00', 7724, '2023-12-10', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Atlanta Falcons', NULL, 'Tampa Bay Buccaneers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Atlanta', 'Mercedes-Benz Stadium');
INSERT INTO public.games VALUES ('NFL_Cincinnati_Bengals_Indianapolis_Colts_2023-12-10_18:00', 7726, '2023-12-10', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cincinnati Bengals', NULL, 'Indianapolis Colts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cincinnati', 'Paycor Stadium');
INSERT INTO public.games VALUES ('NFL_Cleveland_Browns_Jacksonville_Jaguars_2023-12-10_18:00', 7727, '2023-12-10', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cleveland Browns', NULL, 'Jacksonville Jaguars', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cleveland', 'Cleveland Browns Stadium');
INSERT INTO public.games VALUES ('NFL_Baltimore_Ravens_Los_Angeles_Rams_2023-12-10_18:00', 7730, '2023-12-10', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Baltimore Ravens', NULL, 'Los Angeles Rams', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Baltimore', 'M&T Bank Stadium');
INSERT INTO public.games VALUES ('NFL_San_Francisco_49ers_Seattle_Seahawks_2023-12-10_21:05', 7732, '2023-12-10', '21:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'San Francisco 49ers', NULL, 'Seattle Seahawks', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Santa Clara', 'Levi''s Stadium');
INSERT INTO public.games VALUES ('NFL_Kansas_City_Chiefs_Buffalo_Bills_2023-12-10_21:25', 7733, '2023-12-10', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Kansas City Chiefs', NULL, 'Buffalo Bills', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kansas City', 'GEHA Field at Arrowhead Stadium');
INSERT INTO public.games VALUES ('NFL_Miami_Dolphins_Tennessee_Titans_2023-12-12_01:15', 7736, '2023-12-12', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Miami Dolphins', NULL, 'Tennessee Titans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Miami Gardens', 'Hard Rock Stadium');
INSERT INTO public.games VALUES ('NFL_Kansas_City_Chiefs_Las_Vegas_Raiders_2023-12-25_18:00', 7767, '2023-12-25', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Kansas City Chiefs', NULL, 'Las Vegas Raiders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kansas City', 'GEHA Field at Arrowhead Stadium');
INSERT INTO public.games VALUES ('NFL_New_England_Patriots_Buffalo_Bills_2023-10-22_17:00', 7626, '2023-10-22', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New England Patriots', NULL, 'Buffalo Bills', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Foxborough', 'Gillette Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Giants_Washington_Commanders_2023-10-22_17:00', 7627, '2023-10-22', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Giants', NULL, 'Washington Commanders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_Baltimore_Ravens_Detroit_Lions_2023-10-22_17:00', 7629, '2023-10-22', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Baltimore Ravens', NULL, 'Detroit Lions', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Baltimore', 'M&T Bank Stadium');
INSERT INTO public.games VALUES ('NFL_Seattle_Seahawks_Arizona_Cardinals_2023-10-22_20:05', 7631, '2023-10-22', '20:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Seattle Seahawks', NULL, 'Arizona Cardinals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Seattle', 'Lumen Field');
INSERT INTO public.games VALUES ('NFL_Philadelphia_Eagles_Miami_Dolphins_2023-10-23_00:20', 7634, '2023-10-23', '00:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Philadelphia Eagles', NULL, 'Miami Dolphins', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Philadelphia', 'Lincoln Financial Field');
INSERT INTO public.games VALUES ('NFL_Buffalo_Bills_Tampa_Bay_Buccaneers_2023-10-27_00:15', 7636, '2023-10-27', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Buffalo Bills', NULL, 'Tampa Bay Buccaneers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Orchard Park', 'Highmark Stadium');
INSERT INTO public.games VALUES ('NFL_Green_Bay_Packers_Minnesota_Vikings_2023-10-29_17:00', 7638, '2023-10-29', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Green Bay Packers', NULL, 'Minnesota Vikings', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Green Bay', 'Lambeau Field');
INSERT INTO public.games VALUES ('NFL_Tennessee_Titans_Atlanta_Falcons_2023-10-29_17:00', 7639, '2023-10-29', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tennessee Titans', NULL, 'Atlanta Falcons', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nashville', 'Nissan Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Giants_New_York_Jets_2023-10-29_17:00', 7642, '2023-10-29', '17:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Giants', NULL, 'New York Jets', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_San_Francisco_49ers_Cincinnati_Bengals_2023-10-29_20:25', 7649, '2023-10-29', '20:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'San Francisco 49ers', NULL, 'Cincinnati Bengals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Santa Clara', 'Levi''s Stadium');
INSERT INTO public.games VALUES ('NFL_Pittsburgh_Steelers_Tennessee_Titans_2023-11-03_00:15', 7652, '2023-11-03', '00:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Pittsburgh Steelers', NULL, 'Tennessee Titans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Pittsburgh', 'Acrisure Stadium');
INSERT INTO public.games VALUES ('NFL_Kansas_City_Chiefs_Miami_Dolphins_2023-11-05_14:30', 7653, '2023-11-05', '14:30:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Kansas City Chiefs', NULL, 'Miami Dolphins', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Frankfurt', 'Frankfurt Stadium');
INSERT INTO public.games VALUES ('NFL_Atlanta_Falcons_Minnesota_Vikings_2023-11-05_18:00', 7654, '2023-11-05', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Atlanta Falcons', NULL, 'Minnesota Vikings', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Atlanta', 'Mercedes-Benz Stadium');
INSERT INTO public.games VALUES ('NFL_New_Orleans_Saints_Chicago_Bears_2023-11-05_18:00', 7658, '2023-11-05', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New Orleans Saints', NULL, 'Chicago Bears', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'New Orleans', 'Caesars Superdome');
INSERT INTO public.games VALUES ('NFL_Carolina_Panthers_Indianapolis_Colts_2023-11-05_21:05', 7661, '2023-11-05', '21:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Carolina Panthers', NULL, 'Indianapolis Colts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Charlotte', 'Bank of America Stadium');
INSERT INTO public.games VALUES ('NFL_Las_Vegas_Raiders_New_York_Giants_2023-11-05_21:25', 7662, '2023-11-05', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Las Vegas Raiders', NULL, 'New York Giants', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Las Vegas', 'Allegiant Stadium');
INSERT INTO public.games VALUES ('NFL_Philadelphia_Eagles_Dallas_Cowboys_2023-11-05_21:25', 7663, '2023-11-05', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Philadelphia Eagles', NULL, 'Dallas Cowboys', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Philadelphia', 'Lincoln Financial Field');
INSERT INTO public.games VALUES ('NFL_Cincinnati_Bengals_Buffalo_Bills_2023-11-06_01:20', 7664, '2023-11-06', '01:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cincinnati Bengals', NULL, 'Buffalo Bills', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cincinnati', 'Paycor Stadium');
INSERT INTO public.games VALUES ('NFL_Chicago_Bears_Carolina_Panthers_2023-11-10_01:15', 7666, '2023-11-10', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Chicago Bears', NULL, 'Carolina Panthers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Chicago', 'Soldier Field');
INSERT INTO public.games VALUES ('NFL_Cincinnati_Bengals_Houston_Texans_2023-11-12_18:00', 7668, '2023-11-12', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cincinnati Bengals', NULL, 'Houston Texans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cincinnati', 'Paycor Stadium');
INSERT INTO public.games VALUES ('NFL_Minnesota_Vikings_New_Orleans_Saints_2023-11-12_18:00', 7669, '2023-11-12', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Minnesota Vikings', NULL, 'New Orleans Saints', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Minneapolis', 'U.S. Bank Stadium');
INSERT INTO public.games VALUES ('NFL_Tampa_Bay_Buccaneers_Tennessee_Titans_2023-11-12_18:00', 7671, '2023-11-12', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tampa Bay Buccaneers', NULL, 'Tennessee Titans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tampa', 'Raymond James Stadium');
INSERT INTO public.games VALUES ('NFL_Baltimore_Ravens_Cleveland_Browns_2023-11-12_18:00', 7673, '2023-11-12', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Baltimore Ravens', NULL, 'Cleveland Browns', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Baltimore', 'M&T Bank Stadium');
INSERT INTO public.games VALUES ('NFL_Dallas_Cowboys_New_York_Giants_2023-11-12_21:25', 7676, '2023-11-12', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Dallas Cowboys', NULL, 'New York Giants', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Arlington', 'AT&T Stadium');
INSERT INTO public.games VALUES ('NFL_Washington_Commanders_New_York_Giants_2023-11-19_18:00', 7685, '2023-11-19', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Washington Commanders', NULL, 'New York Giants', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Landover', 'FedExField');
INSERT INTO public.games VALUES ('NFL_Houston_Texans_Arizona_Cardinals_2023-11-19_18:00', 7688, '2023-11-19', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Houston Texans', NULL, 'Arizona Cardinals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Houston', 'NRG Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Rams_Seattle_Seahawks_2023-11-19_21:25', 7691, '2023-11-19', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Rams', NULL, 'Seattle Seahawks', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Jets_Miami_Dolphins_2023-11-24_20:00', 7697, '2023-11-24', '20:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Jets', NULL, 'Miami Dolphins', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_Tennessee_Titans_Carolina_Panthers_2023-11-26_18:00', 7700, '2023-11-26', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tennessee Titans', NULL, 'Carolina Panthers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nashville', 'Nissan Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Giants_New_England_Patriots_2023-11-26_18:00', 7702, '2023-11-26', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Giants', NULL, 'New England Patriots', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_Denver_Broncos_Cleveland_Browns_2023-11-26_21:05', 7704, '2023-11-26', '21:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Denver Broncos', NULL, 'Cleveland Browns', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Denver', 'Empower Field at Mile High');
INSERT INTO public.games VALUES ('NFL_Arizona_Cardinals_Los_Angeles_Rams_2023-11-26_21:05', 7705, '2023-11-26', '21:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Arizona Cardinals', NULL, 'Los Angeles Rams', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Glendale', 'State Farm Stadium');
INSERT INTO public.games VALUES ('NFL_Philadelphia_Eagles_Buffalo_Bills_2023-11-26_21:25', 7707, '2023-11-26', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Philadelphia Eagles', NULL, 'Buffalo Bills', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Philadelphia', 'Lincoln Financial Field');
INSERT INTO public.games VALUES ('NFL_Minnesota_Vikings_Chicago_Bears_2023-11-28_01:15', 7709, '2023-11-28', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Minnesota Vikings', NULL, 'Chicago Bears', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Minneapolis', 'U.S. Bank Stadium');
INSERT INTO public.games VALUES ('NFL_New_England_Patriots_Los_Angeles_Chargers_2023-12-03_18:00', 7712, '2023-12-03', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New England Patriots', NULL, 'Los Angeles Chargers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Foxborough', 'Gillette Stadium');
INSERT INTO public.games VALUES ('NFL_Pittsburgh_Steelers_Arizona_Cardinals_2023-12-03_18:00', 7715, '2023-12-03', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Pittsburgh Steelers', NULL, 'Arizona Cardinals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Pittsburgh', 'Acrisure Stadium');
INSERT INTO public.games VALUES ('NFL_Houston_Texans_Denver_Broncos_2023-12-03_21:05', 7718, '2023-12-03', '21:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Houston Texans', NULL, 'Denver Broncos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Houston', 'NRG Stadium');
INSERT INTO public.games VALUES ('NFL_Philadelphia_Eagles_San_Francisco_49ers_2023-12-03_21:25', 7720, '2023-12-03', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Philadelphia Eagles', NULL, 'San Francisco 49ers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Philadelphia', 'Lincoln Financial Field');
INSERT INTO public.games VALUES ('NFL_Green_Bay_Packers_Kansas_City_Chiefs_2023-12-04_01:20', 7721, '2023-12-04', '01:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Green Bay Packers', NULL, 'Kansas City Chiefs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Green Bay', 'Lambeau Field');
INSERT INTO public.games VALUES ('NFL_Chicago_Bears_Detroit_Lions_2023-12-10_18:00', 7725, '2023-12-10', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Chicago Bears', NULL, 'Detroit Lions', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Chicago', 'Soldier Field');
INSERT INTO public.games VALUES ('NFL_Arizona_Cardinals_Atlanta_Falcons_2023-11-12_21:05', 7674, '2023-11-12', '21:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Arizona Cardinals', NULL, 'Atlanta Falcons', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Glendale', 'State Farm Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Chargers_Detroit_Lions_2023-11-12_21:05', 7675, '2023-11-12', '21:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Chargers', NULL, 'Detroit Lions', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_Las_Vegas_Raiders_New_York_Jets_2023-11-13_01:20', 7678, '2023-11-13', '01:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Las Vegas Raiders', NULL, 'New York Jets', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Las Vegas', 'Allegiant Stadium');
INSERT INTO public.games VALUES ('NFL_Green_Bay_Packers_Los_Angeles_Chargers_2023-11-19_18:00', 7683, '2023-11-19', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Green Bay Packers', NULL, 'Los Angeles Chargers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Green Bay', 'Lambeau Field');
INSERT INTO public.games VALUES ('NFL_Denver_Broncos_Minnesota_Vikings_2023-11-20_01:20', 7692, '2023-11-20', '01:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Denver Broncos', NULL, 'Minnesota Vikings', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Denver', 'Empower Field at Mile High');
INSERT INTO public.games VALUES ('NFL_Kansas_City_Chiefs_Philadelphia_Eagles_2023-11-21_01:15', 7693, '2023-11-21', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Kansas City Chiefs', NULL, 'Philadelphia Eagles', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kansas City', 'GEHA Field at Arrowhead Stadium');
INSERT INTO public.games VALUES ('NFL_Detroit_Lions_Green_Bay_Packers_2023-11-23_17:30', 7694, '2023-11-23', '17:30:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Detroit Lions', NULL, 'Green Bay Packers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Detroit', 'Ford Field');
INSERT INTO public.games VALUES ('NFL_Dallas_Cowboys_Washington_Commanders_2023-11-23_21:30', 7695, '2023-11-23', '21:30:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Dallas Cowboys', NULL, 'Washington Commanders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Arlington', 'AT&T Stadium');
INSERT INTO public.games VALUES ('NFL_Seattle_Seahawks_San_Francisco_49ers_2023-11-24_01:20', 7696, '2023-11-24', '01:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Seattle Seahawks', NULL, 'San Francisco 49ers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Seattle', 'Lumen Field');
INSERT INTO public.games VALUES ('NFL_Indianapolis_Colts_Tampa_Bay_Buccaneers_2023-11-26_18:00', 7701, '2023-11-26', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Indianapolis Colts', NULL, 'Tampa Bay Buccaneers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Indianapolis', 'Lucas Oil Stadium');
INSERT INTO public.games VALUES ('NFL_Houston_Texans_Jacksonville_Jaguars_2023-11-26_18:00', 7703, '2023-11-26', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Houston Texans', NULL, 'Jacksonville Jaguars', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Houston', 'NRG Stadium');
INSERT INTO public.games VALUES ('NFL_Las_Vegas_Raiders_Kansas_City_Chiefs_2023-11-26_21:25', 7706, '2023-11-26', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Las Vegas Raiders', NULL, 'Kansas City Chiefs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Las Vegas', 'Allegiant Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Chargers_Baltimore_Ravens_2023-11-27_01:20', 7708, '2023-11-27', '01:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Chargers', NULL, 'Baltimore Ravens', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_Dallas_Cowboys_Seattle_Seahawks_2023-12-01_01:15', 7710, '2023-12-01', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Dallas Cowboys', NULL, 'Seattle Seahawks', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Arlington', 'AT&T Stadium');
INSERT INTO public.games VALUES ('NFL_Tennessee_Titans_Indianapolis_Colts_2023-12-03_18:00', 7711, '2023-12-03', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tennessee Titans', NULL, 'Indianapolis Colts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nashville', 'Nissan Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Jets_Atlanta_Falcons_2023-12-03_18:00', 7714, '2023-12-03', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Jets', NULL, 'Atlanta Falcons', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Giants_Green_Bay_Packers_2023-12-12_01:15', 7737, '2023-12-12', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Giants', NULL, 'Green Bay Packers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_Cleveland_Browns_Chicago_Bears_2023-12-17_00:00', 7740, '2023-12-17', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cleveland Browns', NULL, 'Chicago Bears', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cleveland', 'Cleveland Browns Stadium');
INSERT INTO public.games VALUES ('NFL_Detroit_Lions_Denver_Broncos_2023-12-17_00:00', 7741, '2023-12-17', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Detroit Lions', NULL, 'Denver Broncos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Detroit', 'Ford Field');
INSERT INTO public.games VALUES ('NFL_Indianapolis_Colts_Pittsburgh_Steelers_2023-12-17_00:00', 7742, '2023-12-17', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Indianapolis Colts', NULL, 'Pittsburgh Steelers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Indianapolis', 'Lucas Oil Stadium');
INSERT INTO public.games VALUES ('NFL_Green_Bay_Packers_Tampa_Bay_Buccaneers_2023-12-17_18:00', 7744, '2023-12-17', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Green Bay Packers', NULL, 'Tampa Bay Buccaneers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Green Bay', 'Lambeau Field');
INSERT INTO public.games VALUES ('NFL_Tennessee_Titans_Houston_Texans_2023-12-17_18:00', 7745, '2023-12-17', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tennessee Titans', NULL, 'Houston Texans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nashville', 'Nissan Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Rams_Washington_Commanders_2023-12-17_21:05', 7748, '2023-12-17', '21:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Rams', NULL, 'Washington Commanders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_Buffalo_Bills_Dallas_Cowboys_2023-12-17_21:25', 7750, '2023-12-17', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Buffalo Bills', NULL, 'Dallas Cowboys', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Orchard Park', 'Highmark Stadium');
INSERT INTO public.games VALUES ('NFL_Jacksonville_Jaguars_Baltimore_Ravens_2023-12-18_01:20', 7752, '2023-12-18', '01:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Jacksonville Jaguars', NULL, 'Baltimore Ravens', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Jacksonville', 'EverBank Stadium');
INSERT INTO public.games VALUES ('NFL_New_England_Patriots_Kansas_City_Chiefs_2023-12-19_01:15', 7753, '2023-12-19', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New England Patriots', NULL, 'Kansas City Chiefs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Foxborough', 'Gillette Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Rams_New_Orleans_Saints_2023-12-22_01:15', 7754, '2023-12-22', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Rams', NULL, 'New Orleans Saints', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_Pittsburgh_Steelers_Cincinnati_Bengals_2023-12-23_21:30', 7755, '2023-12-23', '21:30:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Pittsburgh Steelers', NULL, 'Cincinnati Bengals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Pittsburgh', 'Acrisure Stadium');
INSERT INTO public.games VALUES ('NFL_Atlanta_Falcons_Indianapolis_Colts_2023-12-24_18:00', 7757, '2023-12-24', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Atlanta Falcons', NULL, 'Indianapolis Colts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Atlanta', 'Mercedes-Benz Stadium');
INSERT INTO public.games VALUES ('NFL_Tennessee_Titans_Seattle_Seahawks_2023-12-24_18:00', 7758, '2023-12-24', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tennessee Titans', NULL, 'Seattle Seahawks', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Nashville', 'Nissan Stadium');
INSERT INTO public.games VALUES ('NFL_Minnesota_Vikings_Detroit_Lions_2023-12-24_18:00', 7759, '2023-12-24', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Minnesota Vikings', NULL, 'Detroit Lions', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Minneapolis', 'U.S. Bank Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Jets_Washington_Commanders_2023-12-24_18:00', 7760, '2023-12-24', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Jets', NULL, 'Washington Commanders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_Carolina_Panthers_Green_Bay_Packers_2023-12-24_18:00', 7761, '2023-12-24', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Carolina Panthers', NULL, 'Green Bay Packers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Charlotte', 'Bank of America Stadium');
INSERT INTO public.games VALUES ('NFL_Tampa_Bay_Buccaneers_Jacksonville_Jaguars_2023-12-24_21:05', 7763, '2023-12-24', '21:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tampa Bay Buccaneers', NULL, 'Jacksonville Jaguars', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tampa', 'Raymond James Stadium');
INSERT INTO public.games VALUES ('NFL_Chicago_Bears_Arizona_Cardinals_2023-12-24_21:25', 7764, '2023-12-24', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Chicago Bears', NULL, 'Arizona Cardinals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Chicago', 'Soldier Field');
INSERT INTO public.games VALUES ('NFL_Miami_Dolphins_Dallas_Cowboys_2023-12-24_21:25', 7765, '2023-12-24', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Miami Dolphins', NULL, 'Dallas Cowboys', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Miami Gardens', 'Hard Rock Stadium');
INSERT INTO public.games VALUES ('NFL_Philadelphia_Eagles_New_York_Giants_2023-12-25_21:30', 7768, '2023-12-25', '21:30:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Philadelphia Eagles', NULL, 'New York Giants', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Philadelphia', 'Lincoln Financial Field');
INSERT INTO public.games VALUES ('NFL_Philadelphia_Eagles_Arizona_Cardinals_2023-12-31_18:00', 7776, '2023-12-31', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Philadelphia Eagles', NULL, 'Arizona Cardinals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Philadelphia', 'Lincoln Financial Field');
INSERT INTO public.games VALUES ('NFL_Tampa_Bay_Buccaneers_New_Orleans_Saints_2023-12-31_18:00', 7777, '2023-12-31', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Tampa Bay Buccaneers', NULL, 'New Orleans Saints', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tampa', 'Raymond James Stadium');
INSERT INTO public.games VALUES ('NFL_New_Orleans_Saints_Carolina_Panthers_2023-12-10_18:00', 7728, '2023-12-10', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New Orleans Saints', NULL, 'Carolina Panthers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'New Orleans', 'Caesars Superdome');
INSERT INTO public.games VALUES ('NFL_New_York_Jets_Houston_Texans_2023-12-10_18:00', 7729, '2023-12-10', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Jets', NULL, 'Houston Texans', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_Las_Vegas_Raiders_Minnesota_Vikings_2023-12-10_21:05', 7731, '2023-12-10', '21:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Las Vegas Raiders', NULL, 'Minnesota Vikings', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Las Vegas', 'Allegiant Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Chargers_Denver_Broncos_2023-12-10_21:25', 7734, '2023-12-10', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Chargers', NULL, 'Denver Broncos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_Dallas_Cowboys_Philadelphia_Eagles_2023-12-11_01:20', 7735, '2023-12-11', '01:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Dallas Cowboys', NULL, 'Philadelphia Eagles', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Arlington', 'AT&T Stadium');
INSERT INTO public.games VALUES ('NFL_Las_Vegas_Raiders_Los_Angeles_Chargers_2023-12-15_01:15', 7738, '2023-12-15', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Las Vegas Raiders', NULL, 'Los Angeles Chargers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Las Vegas', 'Allegiant Stadium');
INSERT INTO public.games VALUES ('NFL_Cincinnati_Bengals_Minnesota_Vikings_2023-12-17_00:00', 7739, '2023-12-17', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cincinnati Bengals', NULL, 'Minnesota Vikings', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cincinnati', 'Paycor Stadium');
INSERT INTO public.games VALUES ('NFL_Carolina_Panthers_Atlanta_Falcons_2023-12-17_00:00', 7743, '2023-12-17', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Carolina Panthers', NULL, 'Atlanta Falcons', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Charlotte', 'Bank of America Stadium');
INSERT INTO public.games VALUES ('NFL_Miami_Dolphins_New_York_Jets_2023-12-17_18:00', 7746, '2023-12-17', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Miami Dolphins', NULL, 'New York Jets', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Miami Gardens', 'Hard Rock Stadium');
INSERT INTO public.games VALUES ('NFL_New_Orleans_Saints_New_York_Giants_2023-12-17_18:00', 7747, '2023-12-17', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New Orleans Saints', NULL, 'New York Giants', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'New Orleans', 'Caesars Superdome');
INSERT INTO public.games VALUES ('NFL_Arizona_Cardinals_San_Francisco_49ers_2023-12-17_21:05', 7749, '2023-12-17', '21:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Arizona Cardinals', NULL, 'San Francisco 49ers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Glendale', 'State Farm Stadium');
INSERT INTO public.games VALUES ('NFL_Seattle_Seahawks_Philadelphia_Eagles_2023-12-17_21:25', 7751, '2023-12-17', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Seattle Seahawks', NULL, 'Philadelphia Eagles', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Seattle', 'Lumen Field');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Chargers_Buffalo_Bills_2023-12-24_01:00', 7756, '2023-12-24', '01:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Chargers', NULL, 'Buffalo Bills', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_Houston_Texans_Cleveland_Browns_2023-12-24_18:00', 7762, '2023-12-24', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Houston Texans', NULL, 'Cleveland Browns', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Houston', 'NRG Stadium');
INSERT INTO public.games VALUES ('NFL_Denver_Broncos_New_England_Patriots_2023-12-25_01:15', 7766, '2023-12-25', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Denver Broncos', NULL, 'New England Patriots', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Denver', 'Empower Field at Mile High');
INSERT INTO public.games VALUES ('NFL_San_Francisco_49ers_Baltimore_Ravens_2023-12-26_01:15', 7769, '2023-12-26', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'San Francisco 49ers', NULL, 'Baltimore Ravens', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Santa Clara', 'Levi''s Stadium');
INSERT INTO public.games VALUES ('NFL_Chicago_Bears_Atlanta_Falcons_2023-12-31_18:00', 7773, '2023-12-31', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Chicago Bears', NULL, 'Atlanta Falcons', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Chicago', 'Soldier Field');
INSERT INTO public.games VALUES ('NFL_Indianapolis_Colts_Las_Vegas_Raiders_2023-12-31_18:00', 7774, '2023-12-31', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Indianapolis Colts', NULL, 'Las Vegas Raiders', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Indianapolis', 'Lucas Oil Stadium');
INSERT INTO public.games VALUES ('NFL_Jacksonville_Jaguars_Carolina_Panthers_2023-12-31_18:00', 7779, '2023-12-31', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Jacksonville Jaguars', NULL, 'Carolina Panthers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Jacksonville', 'EverBank Stadium');
INSERT INTO public.games VALUES ('NFL_Cleveland_Browns_New_York_Jets_2023-12-29_01:15', 7770, '2023-12-29', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Cleveland Browns', NULL, 'New York Jets', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cleveland', 'Cleveland Browns Stadium');
INSERT INTO public.games VALUES ('NFL_Dallas_Cowboys_Detroit_Lions_2023-12-31_01:15', 7771, '2023-12-31', '01:15:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Dallas Cowboys', NULL, 'Detroit Lions', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Arlington', 'AT&T Stadium');
INSERT INTO public.games VALUES ('NFL_Buffalo_Bills_New_England_Patriots_2023-12-31_18:00', 7772, '2023-12-31', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Buffalo Bills', NULL, 'New England Patriots', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Orchard Park', 'Highmark Stadium');
INSERT INTO public.games VALUES ('NFL_New_York_Giants_Los_Angeles_Rams_2023-12-31_18:00', 7775, '2023-12-31', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'New York Giants', NULL, 'Los Angeles Rams', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'East Rutherford', 'MetLife Stadium');
INSERT INTO public.games VALUES ('NFL_Washington_Commanders_San_Francisco_49ers_2023-12-31_18:00', 7778, '2023-12-31', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Washington Commanders', NULL, 'San Francisco 49ers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Landover', 'FedExField');
INSERT INTO public.games VALUES ('NFL_Seattle_Seahawks_Pittsburgh_Steelers_2023-12-31_21:05', 7782, '2023-12-31', '21:05:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Seattle Seahawks', NULL, 'Pittsburgh Steelers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Seattle', 'Lumen Field');
INSERT INTO public.games VALUES ('NFL_Denver_Broncos_Los_Angeles_Chargers_2023-12-31_21:25', 7783, '2023-12-31', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Denver Broncos', NULL, 'Los Angeles Chargers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Denver', 'Empower Field at Mile High');
INSERT INTO public.games VALUES ('NFL_Kansas_City_Chiefs_Cincinnati_Bengals_2023-12-31_21:25', 7784, '2023-12-31', '21:25:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Kansas City Chiefs', NULL, 'Cincinnati Bengals', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Kansas City', 'GEHA Field at Arrowhead Stadium');
INSERT INTO public.games VALUES ('NFL_Minnesota_Vikings_Green_Bay_Packers_2024-01-01_01:20', 7785, '2024-01-01', '01:20:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Minnesota Vikings', NULL, 'Green Bay Packers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Minneapolis', 'U.S. Bank Stadium');
INSERT INTO public.games VALUES ('NFL_Detroit_Lions_Minnesota_Vikings_2024-01-07_00:00', 7787, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Detroit Lions', NULL, 'Minnesota Vikings', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Detroit', 'Ford Field');
INSERT INTO public.games VALUES ('NFL_Miami_Dolphins_Buffalo_Bills_2024-01-07_00:00', 7792, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Miami Dolphins', NULL, 'Buffalo Bills', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Miami Gardens', 'Hard Rock Stadium');
INSERT INTO public.games VALUES ('NFL_Arizona_Cardinals_Seattle_Seahawks_2024-01-07_00:00', 7796, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Arizona Cardinals', NULL, 'Seattle Seahawks', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Glendale', 'State Farm Stadium');
INSERT INTO public.games VALUES ('NFL_Washington_Commanders_Dallas_Cowboys_2024-01-07_00:00', 7799, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Washington Commanders', NULL, 'Dallas Cowboys', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Landover', 'FedExField');
INSERT INTO public.games VALUES ('NFL_Carolina_Panthers_Tampa_Bay_Buccaneers_2024-01-07_00:00', 7800, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Carolina Panthers', NULL, 'Tampa Bay Buccaneers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Charlotte', 'Bank of America Stadium');
INSERT INTO public.games VALUES ('NFL_Baltimore_Ravens_Pittsburgh_Steelers_2024-01-07_00:00', 7801, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Baltimore Ravens', NULL, 'Pittsburgh Steelers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Baltimore', 'M&T Bank Stadium');
INSERT INTO public.games VALUES ('NFL_Baltimore_Ravens_Miami_Dolphins_2023-12-31_18:00', 7780, '2023-12-31', '18:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Baltimore Ravens', NULL, 'Miami Dolphins', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Baltimore', 'M&T Bank Stadium');
INSERT INTO public.games VALUES ('NFL_Los_Angeles_Chargers_Kansas_City_Chiefs_2024-01-07_00:00', 7797, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'Los Angeles Chargers', NULL, 'Kansas City Chiefs', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inglewood', 'SoFi Stadium');
INSERT INTO public.games VALUES ('NFL_San_Francisco_49ers_Los_Angeles_Rams_2024-01-07_00:00', 7798, '2024-01-07', '00:00:00', 'Regular Season', 'NFL', 2023, 'NS', NULL, 'San Francisco 49ers', NULL, 'Los Angeles Rams', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Santa Clara', 'Levi''s Stadium');


--
-- TOC entry 3395 (class 0 OID 16721)
-- Dependencies: 226
-- Data for Name: markets; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.markets VALUES (181, 'betmgm', 'NFL_Washington_Commanders_Arizona_Cardinals_2023-09-10_17:00', 'Arizona Cardinals', 'h2h', NULL, 3.4, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (182, 'betmgm', 'NFL_Atlanta_Falcons_Carolina_Panthers_2023-09-10_17:00', 'Over', 'totals', 39.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (183, 'betmgm', 'NFL_Atlanta_Falcons_Carolina_Panthers_2023-09-10_17:00', 'Under', 'totals', 39.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (184, 'betmgm', 'NFL_Baltimore_Ravens_Houston_Texans_2023-09-10_17:00', 'Baltimore Ravens', 'h2h', NULL, 1.22, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (185, 'betmgm', 'NFL_Baltimore_Ravens_Houston_Texans_2023-09-10_17:00', 'Houston Texans', 'h2h', NULL, 4.5, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (186, 'betmgm', 'NFL_Baltimore_Ravens_Houston_Texans_2023-09-10_17:00', 'Baltimore Ravens', 'spreads', -9.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (187, 'betmgm', 'NFL_Baltimore_Ravens_Houston_Texans_2023-09-10_17:00', 'Houston Texans', 'spreads', 9.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (188, 'betmgm', 'NFL_Baltimore_Ravens_Houston_Texans_2023-09-10_17:00', 'Over', 'totals', 43.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (189, 'betmgm', 'NFL_Baltimore_Ravens_Houston_Texans_2023-09-10_17:00', 'Under', 'totals', 43.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (190, 'betmgm', 'NFL_Cleveland_Browns_Cincinnati_Bengals_2023-09-10_17:00', 'Cincinnati Bengals', 'h2h', NULL, 1.77, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (191, 'betmgm', 'NFL_Cleveland_Browns_Cincinnati_Bengals_2023-09-10_17:00', 'Cleveland Browns', 'h2h', NULL, 2.1, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (192, 'betmgm', 'NFL_Cleveland_Browns_Cincinnati_Bengals_2023-09-10_17:00', 'Cincinnati Bengals', 'spreads', -2, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (193, 'betmgm', 'NFL_Cleveland_Browns_Cincinnati_Bengals_2023-09-10_17:00', 'Cleveland Browns', 'spreads', 2, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (194, 'betmgm', 'NFL_Cleveland_Browns_Cincinnati_Bengals_2023-09-10_17:00', 'Over', 'totals', 47.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (195, 'betmgm', 'NFL_Cleveland_Browns_Cincinnati_Bengals_2023-09-10_17:00', 'Under', 'totals', 47.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (196, 'betmgm', 'NFL_Indianapolis_Colts_Jacksonville_Jaguars_2023-09-10_17:00', 'Indianapolis Colts', 'h2h', NULL, 2.8, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (197, 'betmgm', 'NFL_Indianapolis_Colts_Jacksonville_Jaguars_2023-09-10_17:00', 'Jacksonville Jaguars', 'h2h', NULL, 1.44, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (198, 'betmgm', 'NFL_Indianapolis_Colts_Jacksonville_Jaguars_2023-09-10_17:00', 'Indianapolis Colts', 'spreads', 4.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (199, 'betmgm', 'NFL_Indianapolis_Colts_Jacksonville_Jaguars_2023-09-10_17:00', 'Jacksonville Jaguars', 'spreads', -4.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (200, 'betmgm', 'NFL_Indianapolis_Colts_Jacksonville_Jaguars_2023-09-10_17:00', 'Over', 'totals', 46, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (201, 'betmgm', 'NFL_Indianapolis_Colts_Jacksonville_Jaguars_2023-09-10_17:00', 'Under', 'totals', 46, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (202, 'betmgm', 'NFL_Minnesota_Vikings_Tampa_Bay_Buccaneers_2023-09-10_17:00', 'Minnesota Vikings', 'h2h', NULL, 1.4, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (203, 'betmgm', 'NFL_Minnesota_Vikings_Tampa_Bay_Buccaneers_2023-09-10_17:00', 'Tampa Bay Buccaneers', 'h2h', NULL, 3, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (204, 'betmgm', 'NFL_Minnesota_Vikings_Tampa_Bay_Buccaneers_2023-09-10_17:00', 'Minnesota Vikings', 'spreads', -5.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (205, 'betmgm', 'NFL_Minnesota_Vikings_Tampa_Bay_Buccaneers_2023-09-10_17:00', 'Tampa Bay Buccaneers', 'spreads', 5.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (206, 'betmgm', 'NFL_Minnesota_Vikings_Tampa_Bay_Buccaneers_2023-09-10_17:00', 'Over', 'totals', 46, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (207, 'betmgm', 'NFL_Minnesota_Vikings_Tampa_Bay_Buccaneers_2023-09-10_17:00', 'Under', 'totals', 46, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (208, 'betmgm', 'NFL_New_Orleans_Saints_Tennessee_Titans_2023-09-10_17:00', 'New Orleans Saints', 'h2h', NULL, 1.65, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (209, 'betmgm', 'NFL_New_Orleans_Saints_Tennessee_Titans_2023-09-10_17:00', 'Tennessee Titans', 'h2h', NULL, 2.3, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (210, 'betmgm', 'NFL_New_Orleans_Saints_Tennessee_Titans_2023-09-10_17:00', 'New Orleans Saints', 'spreads', -3, 1.95, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (211, 'betmgm', 'NFL_New_Orleans_Saints_Tennessee_Titans_2023-09-10_17:00', 'Tennessee Titans', 'spreads', 3, 1.87, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (212, 'betmgm', 'NFL_New_Orleans_Saints_Tennessee_Titans_2023-09-10_17:00', 'Over', 'totals', 41.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (213, 'betmgm', 'NFL_New_Orleans_Saints_Tennessee_Titans_2023-09-10_17:00', 'Under', 'totals', 41.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (214, 'betmgm', 'NFL_Pittsburgh_Steelers_San_Francisco_49ers_2023-09-10_17:00', 'Pittsburgh Steelers', 'h2h', NULL, 2.1, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (215, 'betmgm', 'NFL_Pittsburgh_Steelers_San_Francisco_49ers_2023-09-10_17:00', 'San Francisco 49ers', 'h2h', NULL, 1.77, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (216, 'betmgm', 'NFL_Pittsburgh_Steelers_San_Francisco_49ers_2023-09-10_17:00', 'Pittsburgh Steelers', 'spreads', 2.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (217, 'betmgm', 'NFL_Pittsburgh_Steelers_San_Francisco_49ers_2023-09-10_17:00', 'San Francisco 49ers', 'spreads', -2.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (218, 'betmgm', 'NFL_Pittsburgh_Steelers_San_Francisco_49ers_2023-09-10_17:00', 'Over', 'totals', 41.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (219, 'betmgm', 'NFL_Pittsburgh_Steelers_San_Francisco_49ers_2023-09-10_17:00', 'Under', 'totals', 41.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (220, 'betmgm', 'NFL_Chicago_Bears_Green_Bay_Packers_2023-09-10_20:25', 'Chicago Bears', 'h2h', NULL, 1.8, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (221, 'betmgm', 'NFL_Chicago_Bears_Green_Bay_Packers_2023-09-10_20:25', 'Green Bay Packers', 'h2h', NULL, 2.05, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (222, 'betmgm', 'NFL_Chicago_Bears_Green_Bay_Packers_2023-09-10_20:25', 'Chicago Bears', 'spreads', -1.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (223, 'betmgm', 'NFL_Chicago_Bears_Green_Bay_Packers_2023-09-10_20:25', 'Green Bay Packers', 'spreads', 1.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (224, 'betmgm', 'NFL_Chicago_Bears_Green_Bay_Packers_2023-09-10_20:25', 'Over', 'totals', 41.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (225, 'betmgm', 'NFL_Chicago_Bears_Green_Bay_Packers_2023-09-10_20:25', 'Under', 'totals', 41.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (226, 'betmgm', 'NFL_Denver_Broncos_Las_Vegas_Raiders_2023-09-10_20:25', 'Denver Broncos', 'h2h', NULL, 1.57, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (227, 'betmgm', 'NFL_Denver_Broncos_Las_Vegas_Raiders_2023-09-10_20:25', 'Las Vegas Raiders', 'h2h', NULL, 2.45, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (228, 'betmgm', 'NFL_Denver_Broncos_Las_Vegas_Raiders_2023-09-10_20:25', 'Denver Broncos', 'spreads', -3, 1.83, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (229, 'betmgm', 'NFL_Denver_Broncos_Las_Vegas_Raiders_2023-09-10_20:25', 'Las Vegas Raiders', 'spreads', 3, 2, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (230, 'betmgm', 'NFL_Denver_Broncos_Las_Vegas_Raiders_2023-09-10_20:25', 'Over', 'totals', 43, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (231, 'betmgm', 'NFL_Denver_Broncos_Las_Vegas_Raiders_2023-09-10_20:25', 'Under', 'totals', 43, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (232, 'betmgm', 'NFL_Los_Angeles_Chargers_Miami_Dolphins_2023-09-10_20:25', 'Los Angeles Chargers', 'h2h', NULL, 1.62, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (233, 'betmgm', 'NFL_Los_Angeles_Chargers_Miami_Dolphins_2023-09-10_20:25', 'Miami Dolphins', 'h2h', NULL, 2.35, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (234, 'betmgm', 'NFL_Los_Angeles_Chargers_Miami_Dolphins_2023-09-10_20:25', 'Los Angeles Chargers', 'spreads', -3, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (235, 'betmgm', 'NFL_Los_Angeles_Chargers_Miami_Dolphins_2023-09-10_20:25', 'Miami Dolphins', 'spreads', 3, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (236, 'betmgm', 'NFL_Los_Angeles_Chargers_Miami_Dolphins_2023-09-10_20:25', 'Over', 'totals', 51, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (237, 'betmgm', 'NFL_Los_Angeles_Chargers_Miami_Dolphins_2023-09-10_20:25', 'Under', 'totals', 51, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (238, 'betmgm', 'NFL_Seattle_Seahawks_Los_Angeles_Rams_2023-09-10_20:25', 'Los Angeles Rams', 'h2h', NULL, 2.8, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (239, 'betmgm', 'NFL_Seattle_Seahawks_Los_Angeles_Rams_2023-09-10_20:25', 'Seattle Seahawks', 'h2h', NULL, 1.44, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (240, 'betmgm', 'NFL_Seattle_Seahawks_Los_Angeles_Rams_2023-09-10_20:25', 'Los Angeles Rams', 'spreads', 4.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (241, 'betmgm', 'NFL_Seattle_Seahawks_Los_Angeles_Rams_2023-09-10_20:25', 'Seattle Seahawks', 'spreads', -4.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (242, 'betmgm', 'NFL_Seattle_Seahawks_Los_Angeles_Rams_2023-09-10_20:25', 'Over', 'totals', 46, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (243, 'betmgm', 'NFL_Seattle_Seahawks_Los_Angeles_Rams_2023-09-10_20:25', 'Under', 'totals', 46, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (244, 'betmgm', 'NFL_New_England_Patriots_Philadelphia_Eagles_2023-09-10_20:25', 'New England Patriots', 'h2h', NULL, 2.55, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (245, 'betmgm', 'NFL_New_England_Patriots_Philadelphia_Eagles_2023-09-10_20:25', 'Philadelphia Eagles', 'h2h', NULL, 1.53, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (246, 'betmgm', 'NFL_New_England_Patriots_Philadelphia_Eagles_2023-09-10_20:25', 'New England Patriots', 'spreads', 4, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (247, 'betmgm', 'NFL_New_England_Patriots_Philadelphia_Eagles_2023-09-10_20:25', 'Philadelphia Eagles', 'spreads', -4, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (248, 'betmgm', 'NFL_New_England_Patriots_Philadelphia_Eagles_2023-09-10_20:25', 'Over', 'totals', 44.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (249, 'betmgm', 'NFL_New_England_Patriots_Philadelphia_Eagles_2023-09-10_20:25', 'Under', 'totals', 44.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (250, 'betmgm', 'NFL_New_York_Giants_Dallas_Cowboys_2023-09-11_00:20', 'Dallas Cowboys', 'h2h', NULL, 1.57, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (251, 'betmgm', 'NFL_New_York_Giants_Dallas_Cowboys_2023-09-11_00:20', 'New York Giants', 'h2h', NULL, 2.45, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (252, 'betmgm', 'NFL_New_York_Giants_Dallas_Cowboys_2023-09-11_00:20', 'Dallas Cowboys', 'spreads', -3.5, 1.95, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (253, 'betmgm', 'NFL_New_York_Giants_Dallas_Cowboys_2023-09-11_00:20', 'New York Giants', 'spreads', 3.5, 1.87, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (254, 'betmgm', 'NFL_New_York_Giants_Dallas_Cowboys_2023-09-11_00:20', 'Over', 'totals', 45.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (255, 'betmgm', 'NFL_New_York_Giants_Dallas_Cowboys_2023-09-11_00:20', 'Under', 'totals', 45.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (256, 'betmgm', 'NFL_New_York_Jets_Buffalo_Bills_2023-09-12_00:15', 'Buffalo Bills', 'h2h', NULL, 1.69, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (257, 'betmgm', 'NFL_New_York_Jets_Buffalo_Bills_2023-09-12_00:15', 'New York Jets', 'h2h', NULL, 2.2, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (258, 'betmgm', 'NFL_New_York_Jets_Buffalo_Bills_2023-09-12_00:15', 'Buffalo Bills', 'spreads', -2.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (259, 'betmgm', 'NFL_New_York_Jets_Buffalo_Bills_2023-09-12_00:15', 'New York Jets', 'spreads', 2.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (260, 'betmgm', 'NFL_New_York_Jets_Buffalo_Bills_2023-09-12_00:15', 'Over', 'totals', 45.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (261, 'betmgm', 'NFL_New_York_Jets_Buffalo_Bills_2023-09-12_00:15', 'Under', 'totals', 45.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (262, 'betmgm', 'NFL_Washington_Commanders_Arizona_Cardinals_2023-09-10_17:00', 'Washington Commanders', 'h2h', NULL, 1.33, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (263, 'betmgm', 'NFL_Washington_Commanders_Arizona_Cardinals_2023-09-10_17:00', 'Arizona Cardinals', 'spreads', 7, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (264, 'betmgm', 'NFL_Washington_Commanders_Arizona_Cardinals_2023-09-10_17:00', 'Washington Commanders', 'spreads', -7, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (265, 'betmgm', 'NFL_Washington_Commanders_Arizona_Cardinals_2023-09-10_17:00', 'Over', 'totals', 38, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (266, 'betmgm', 'NFL_Washington_Commanders_Arizona_Cardinals_2023-09-10_17:00', 'Under', 'totals', 38, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (267, 'betmgm', 'NFL_Atlanta_Falcons_Carolina_Panthers_2023-09-10_17:00', 'Atlanta Falcons', 'h2h', NULL, 1.54, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (268, 'betmgm', 'NFL_Atlanta_Falcons_Carolina_Panthers_2023-09-10_17:00', 'Carolina Panthers', 'h2h', NULL, 2.5, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (269, 'betmgm', 'NFL_Atlanta_Falcons_Carolina_Panthers_2023-09-10_17:00', 'Atlanta Falcons', 'spreads', -3.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (270, 'betmgm', 'NFL_Atlanta_Falcons_Carolina_Panthers_2023-09-10_17:00', 'Carolina Panthers', 'spreads', 3.5, 1.91, '2023-09-10 00:13:00');
INSERT INTO public.markets VALUES (5, 'betmgm', 'NFL_Kansas_City_Chiefs_Detroit_Lions_2023-09-08_00:20', 'Kansas City Chiefs', 'spreads', -6.5, 1.91, '2023-09-03 22:33:08');
INSERT INTO public.markets VALUES (6, 'betmgm', 'NFL_Kansas_City_Chiefs_Detroit_Lions_2023-09-08_00:20', 'Under', 'totals', 54, 1.91, '2023-09-03 22:33:08');
INSERT INTO public.markets VALUES (7, 'betmgm', 'NFL_Kansas_City_Chiefs_Detroit_Lions_2023-09-08_00:20', 'Detroit Lions', 'h2h', NULL, 3.2, '2023-09-03 22:33:08');
INSERT INTO public.markets VALUES (8, 'betmgm', 'NFL_Kansas_City_Chiefs_Detroit_Lions_2023-09-08_00:20', 'Kansas City Chiefs', 'h2h', NULL, 1.36, '2023-09-03 22:33:08');
INSERT INTO public.markets VALUES (9, 'betmgm', 'NFL_Kansas_City_Chiefs_Detroit_Lions_2023-09-08_00:20', 'Detroit Lions', 'spreads', 6.5, 1.91, '2023-09-03 22:33:08');
INSERT INTO public.markets VALUES (10, 'betmgm', 'NFL_Kansas_City_Chiefs_Detroit_Lions_2023-09-08_00:20', 'Over', 'totals', 54, 1.91, '2023-09-03 22:33:08');


--
-- TOC entry 3385 (class 0 OID 16598)
-- Dependencies: 216
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3384 (class 0 OID 16588)
-- Dependencies: 215
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" VALUES (22, 'noel', '$2a$10$bLsXPPKfOQlDp3XVW1BueOQ04Cqx0io2u6v9SBs3XKpvLp2RIjbmO');


--
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 223
-- Name: bets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bets_id_seq', 3, true);


--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 219
-- Name: contests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contests_id_seq', 5, true);


--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 221
-- Name: entries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entries_id_seq', 61, true);


--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 225
-- Name: markets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.markets_id_seq', 270, true);


--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 214
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 22, true);


--
-- TOC entry 3232 (class 2606 OID 16708)
-- Name: bets bets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bets
    ADD CONSTRAINT bets_pkey PRIMARY KEY (id);


--
-- TOC entry 3226 (class 2606 OID 16616)
-- Name: bookmakers bookmakers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmakers
    ADD CONSTRAINT bookmakers_pkey PRIMARY KEY (api_key);


--
-- TOC entry 3222 (class 2606 OID 16609)
-- Name: competitions competitions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitions
    ADD CONSTRAINT competitions_pkey PRIMARY KEY (api_key);


--
-- TOC entry 3224 (class 2606 OID 16611)
-- Name: competitions competitions_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitions
    ADD CONSTRAINT competitions_title_key UNIQUE (title);


--
-- TOC entry 3228 (class 2606 OID 16768)
-- Name: contests contests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contests
    ADD CONSTRAINT contests_pkey PRIMARY KEY (id);


--
-- TOC entry 3230 (class 2606 OID 16668)
-- Name: entries entries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_pkey PRIMARY KEY (id);


--
-- TOC entry 3236 (class 2606 OID 16738)
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- TOC entry 3234 (class 2606 OID 16728)
-- Name: markets markets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.markets
    ADD CONSTRAINT markets_pkey PRIMARY KEY (id);


--
-- TOC entry 3218 (class 2606 OID 16604)
-- Name: teams teams_full_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_full_name_key UNIQUE (full_name);


--
-- TOC entry 3220 (class 2606 OID 16602)
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- TOC entry 3214 (class 2606 OID 16595)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3216 (class 2606 OID 16597)
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- TOC entry 3239 (class 2606 OID 16752)
-- Name: bets bets_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bets
    ADD CONSTRAINT bets_fk FOREIGN KEY (market_id) REFERENCES public.markets(id);


--
-- TOC entry 3240 (class 2606 OID 16709)
-- Name: bets bets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bets
    ADD CONSTRAINT bets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- TOC entry 3237 (class 2606 OID 16775)
-- Name: entries entries_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_fk FOREIGN KEY (contest_id) REFERENCES public.contests(id);


--
-- TOC entry 3238 (class 2606 OID 16669)
-- Name: entries entries_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries
    ADD CONSTRAINT entries_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


-- Completed on 2023-09-10 23:57:40

--
-- PostgreSQL database dump complete
--

