const fetch = require("node-fetch");
const teamIds = { PSG: 85, OM: 81, OL: 80, LOSC: 79, "AS Monaco": 91 };
const dayjs = require("dayjs");
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

async function teamLastGame(teams) {
  const id = teamIds[teams];
  console.log("ID ============>", id);

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?team=${id}&season=2023&league=61&last=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": process.env.FOOTBALL_API_KEY,
        },
      }
    );
    const data = await response.json();
    console.log(data.response[0]);
    // Find my team based on the id in parameters
    const team =
      data.response[0].teams.away.id === id
        ? data.response[0].teams.away.name
        : data.response[0].teams.home.name;
        // Find the opponent
    const opponent =
      team === data.response[0].teams.away.name
        ? data.response[0].teams.home.name
        : data.response[0].teams.away.name;
    const date = dayjs(data.response[0].fixture.date).fromNow();
    const stadium = data.response[0].fixture.venue.name;
// Was my team playing away or home
const isAwayTeam = data.response[0].teams.away.id === id;

// Score by team
const teamScore = isAwayTeam
  ? data.response[0].goals.away
  : data.response[0].goals.home;
const opponentScore = isAwayTeam
  ? data.response[0].goals.home
  : data.response[0].goals.away;
     
  // Calculate the game result
const gameResult = teamScore > opponentScore
  ? 'win'
  : teamScore === opponentScore
  ? 'draw'
  : 'loss';

  console.log(team,teamScore,opponentScore,opponent, gameResult);
    const fulfillmentMessages = {
      fulfillmentMessages: [
        {
          text: {
            text: [`The last game of ${team} ended in a ${gameResult}, ${teamScore}-${opponentScore} against ${opponent}, ${date}.`],
          },
        },
      ],
    };

    return fulfillmentMessages;
  } catch (error) {
    throw error;
  }
}

module.exports = teamLastGame;
