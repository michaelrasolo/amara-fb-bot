const fetch = require("node-fetch");
const teamIds = { PSG: 85, OM: 81, OL: 80, LOSC: 79, "AS Monaco": 91 };

async function teamStadium(teams) {
  const id = teamIds[teams];
  console.log("ID ============>", id);

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/teams?id=${id}`,
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
    console.log(data.response[0].venue.address);
    let { name, city, capacity, address } = data.response[0].venue;
    city = city.replace(/&apos;/g, "'");
    address = address.replace(/&apos;/g, "'");
    const team = data.response[0].team.name;
    const fulfillmentMessages = {
      fulfillmentMessages: [
        {
          text: {
            text: [
              `The team plays in ${name} which is located in the city of ${city} at ${address}. On big nights, ${team} can welcome up to ${capacity} fans.`,
            ],
          },
        },
      ],
    };

    return fulfillmentMessages;
  } catch (error) {
    throw error;
  }
}

module.exports = teamStadium;
