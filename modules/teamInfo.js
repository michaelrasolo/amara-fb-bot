const fetch = require("node-fetch");
const teamIds = {
  PSG: { id: 85, website: "https://www.psg.fr" },
  OM: { id: 81, website: "https://www.om.net" },
  OL: { id: 80, website: "https://www.ol.fr" },
  LOSC: { id: 79, website: "https://www.losc.fr" },
  "AS Monaco": { id: 91, website: "https://www.asmonaco.com" },
};

async function teamInfo(teams) {
  const id = teamIds[teams].id;
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

    const { name, founded, logo, country } = data.response[0].team;

    const fulfillmentMessages = {
      fulfillmentMessages: [
        {
          card: {
            title: `${name} is a football club from ${country}, founded in ${founded}.`,
            subtitle: teamIds[teams].website,
            imageUri: logo,
            buttons: [
              {
                text: `Visit ${name} website`,
                postback: teamIds[teams].website,
              },
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

module.exports = teamInfo;
