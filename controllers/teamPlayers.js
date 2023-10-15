const fetch = require("node-fetch");
const teamIds = { PSG: 85, OM: 81, OL: 80, LOSC: 79, "AS Monaco": 91 };

async function teamPlayers(teams) {
  const id = teamIds[teams];
  console.log("ID ============>", id);

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/players/squads?team=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", 
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": process.env.FOOTBALL_API_KEY,
        },
      }
    );

    const data = await response.json();
const team = data.response[0].team.name;
const players = data.response[0].players;
const playersIndex = [];
for (let index = 0; index < 3; index++) {
  const random = Math.floor(Math.random()*players.length);
  if (!playersIndex.includes(random)){
    playersIndex.push(random)
  }
}
const [player1, player2, player3] = playersIndex.map(index => players[index].name);
console.log(player1, player2, player3);
    const fulfillmentMessages = {
        "fulfillmentMessages": [
          {
            "text": {
              "text": [
                `${team} has ${players.length} professional players in the roster, including the famous ${player1} and the great ${player2}. ${player3} is also part of the team, but probably shouldn't...`
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

module.exports = teamPlayers;
