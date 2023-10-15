const fetch = require("node-fetch");
const teamIds = { PSG: 85, OM: 81, OL: 80, LOSC: 79, "AS Monaco": 91 };
const dayjs = require('dayjs')
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

async function teamNextGame(teams) {
  const id = teamIds[teams];
  console.log("ID ============>", id);

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?team=${id}&season=2023&league=61&next=1`,
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
    console.log(data.response[0].teams.home.name);
    const homeTeam = data.response[0].teams.home.name;
    const awayTeam = data.response[0].teams.away.name;
    const date = dayjs(data.response[0].fixture.date).format("MMMM D")
    const hour = dayjs(data.response[0].fixture.date).format("LT")
    ;
    const stadium = data.response[0].fixture.venue.name;

    const fulfillmentMessages = {
        "fulfillmentMessages": [
          {
            "text": {
              "text": [
                `The next match will be on ${date} between ${homeTeam} and ${awayTeam}. At ${hour}, it's gonna go down at ${stadium}!`
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

module.exports = teamNextGame;
