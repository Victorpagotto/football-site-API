const matchesMock = {
  correct: {
    matches: [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 2,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }],
      inProgress: [
        {
          "id": 41,
          "homeTeam": 16,
          "homeTeamGoals": 2,
          "awayTeam": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "teamHome": {
            "teamName": "São Paulo"
          },
          "teamAway": {
            "teamName": "Internacional"
          }
        },
        {
          "id": 42,
          "homeTeam": 6,
          "homeTeamGoals": 1,
          "awayTeam": 1,
          "awayTeamGoals": 0,
          "inProgress": true,
          "teamHome": {
            "teamName": "Ferroviária"
          },
          "teamAway": {
            "teamName": "Avaí/Kindermann"
          }
        }
      ],
      finished: [
        {
          "id": 1,
          "homeTeam": 16,
          "homeTeamGoals": 1,
          "awayTeam": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "teamHome": {
            "teamName": "São Paulo"
          },
          "teamAway": {
            "teamName": "Grêmio"
          }
        },
        {
          "id": 2,
          "homeTeam": 9,
          "homeTeamGoals": 1,
          "awayTeam": 14,
          "awayTeamGoals": 1,
          "inProgress": false,
          "teamHome": {
            "teamName": "Internacional"
          },
          "teamAway": {
            "teamName": "Santos"
          }
        }
      ],
  },
  create: {
    insert: {
      correct: {
        "homeTeam": 16, // O valor deve ser o id do time
        "awayTeam": 8, // O valor deve ser o id do time
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      },
      sameTeam: {
        "homeTeam": 16, // O valor deve ser o id do time
        "awayTeam": 16, // O valor deve ser o id do time
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      },
      ghostTeam: {
        "homeTeam": 99999, // O valor deve ser o id do time
        "awayTeam": 99999, // O valor deve ser o id do time
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      },
      invalidToken: {
        "token": 'This is a token, trust me bro. Sources: voices in my head.'
      },
      noHome: {
        "awayTeam": 8, // O valor deve ser o id do time
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      },
      noAway: {
        "homeTeam": 16, // O valor deve ser o id do time
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      },
      noHomeGoals: {
        "homeTeam": 16, // O valor deve ser o id do time
        "awayTeam": 8, // O valor deve ser o id do time
        "awayTeamGoals": 2,
      },
      noAwayGoals: {
        "homeTeam": 16, // O valor deve ser o id do time
        "awayTeam": 8, // O valor deve ser o id do time
        "homeTeamGoals": 2,
      }
    },
    return: {
      correct: {
        dataValues: {
          "id": 1,
          "homeTeam": 16,
          "homeTeamGoals": 2,
          "awayTeam": 8,
          "awayTeamGoals": 2,
          "inProgress": true,
        },
      },
      sameTeam: {
        "message": 'It is not possible to create a match with two equal teams',
      },
      ghostTeam: {
        "message": 'There is no team with such id!',
      },
      invalidToken: {
        "message": 'Token must be a valid token',
      },
      noHome: {
        "message": 'All fields must be filled',
      },
      noAway: {
        "message": 'All fields must be filled',
      },
      noHomeGoals: {
        "message": 'All fields must be filled',
      },
      noAwayGoals: {
        "message": 'All fields must be filled',
      }
    },
  },
}

export default matchesMock;
