const fetch = require("node-fetch");
const teamIds = { PSG: 85, OM: 81, OL: 80, LOSC: 79, "AS Monaco": 91 };

async function teamRank(teams) {
  const id = teamIds[teams];
  console.log("ID ============>", id);

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/standings?team=${id}&season=2023&league=61`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", // Specify JSON response
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": process.env.FOOTBALL_API_KEY,
        },
      }
    );

    const data = await response.json();
// console.log(data.response[0].venue.address);
const { rank, points, goalsDiff } = data.response[0].league.standings[0][0];
const team = data.response[0].league.standings[0][0].team.name;
    const fulfillmentMessages = {
        "fulfillmentMessages": [
          {
            "text": {
              "text": [
                `In Ligue 1, ${team} ranks at the #${rank} spot out of 18 teams with ${points} points and a goal difference of ${goalsDiff}.`
              ]
            }
          }
        ]
      };

    return fulfillmentMessages;
  } catch (error) {
    throw error;
  }
}

module.exports = teamRank;
