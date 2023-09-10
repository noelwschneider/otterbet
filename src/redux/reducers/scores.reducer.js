let sampleData = [{
    "game": {
        "id": 7536,
        "stage": "Regular Season",
        "week": "Week 1",
        "date": {
            "timezone": "UTC",
            "date": "2023-09-10",
            "time": "17:00",
            "timestamp": 1694365200
        },
        "venue": {
            "name": "U.S. Bank Stadium",
            "city": "Minneapolis"
        },
        "status": {
            "short": "NS",
            "long": "Not Started",
            "timer": null
        }
    },
    "league": {
        "id": 1,
        "name": "NFL",
        "season": "2023",
        "logo": "https://media-4.api-sports.io/american-football/leagues/1.png",
        "country": {
            "name": "USA",
            "code": "US",
            "flag": "https://media-4.api-sports.io/flags/us.svg"
        }
    },
    "teams": {
        "home": {
            "id": 32,
            "name": "Minnesota Vikings",
            "logo": "https://media-4.api-sports.io/american-football/teams/32.png"
        },
        "away": {
            "id": 24,
            "name": "Tampa Bay Buccaneers",
            "logo": "https://media-4.api-sports.io/american-football/teams/24.png"
        }
    },
    "scores": {
        "home": {
            "quarter_1": null,
            "quarter_2": null,
            "quarter_3": null,
            "quarter_4": null,
            "overtime": null,
            "total": null
        },
        "away": {
            "quarter_1": null,
            "quarter_2": null,
            "quarter_3": null,
            "quarter_4": null,
            "overtime": null,
            "total": null
        }
    },
    "id": "NFL_Minnesota_Vikings_Tampa_Bay_Buccaneers_2023-09-10_17:00"
},
{
    "game": {
        "id": 7532,
        "stage": "Regular Season",
        "week": "Week 1",
        "date": {
            "timezone": "UTC",
            "date": "2023-09-08",
            "time": "00:20",
            "timestamp": 1694132400
        },
        "venue": {
            "name": "GEHA Field at Arrowhead Stadium",
            "city": "Kansas City"
        },
        "status": {
            "short": "FT",
            "long": "Finished",
            "timer": null
        }
    },
    "league": {
        "id": 1,
        "name": "NFL",
        "season": "2023",
        "logo": "https://media-4.api-sports.io/american-football/leagues/1.png",
        "country": {
            "name": "USA",
            "code": "US",
            "flag": "https://media-4.api-sports.io/flags/us.svg"
        }
    },
    "teams": {
        "home": {
            "id": 17,
            "name": "Kansas City Chiefs",
            "logo": "https://media-4.api-sports.io/american-football/teams/17.png"
        },
        "away": {
            "id": 7,
            "name": "Detroit Lions",
            "logo": "https://media-4.api-sports.io/american-football/teams/7.png"
        }
    },
    "scores": {
        "home": {
            "quarter_1": 0,
            "quarter_2": 14,
            "quarter_3": 3,
            "quarter_4": 3,
            "overtime": null,
            "total": 20
        },
        "away": {
            "quarter_1": 7,
            "quarter_2": 0,
            "quarter_3": 7,
            "quarter_4": 7,
            "overtime": null,
            "total": 21
        }
    },
    "id": "NFL_Kansas_City_Chiefs_Detroit_Lions_2023-09-08_00:20"
}
]

const scoresReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_SCORES':
            return action.payload;
        default:
            return state;
    }
}

export default scoresReducer