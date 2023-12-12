
# Amara - FB Messenger Bot
![Facebook Messenger Bot](https://res.cloudinary.com/dwccdtirq/image/upload/v1697498988/amara_qbrceq.jpg)

Amara is a Facebook Messenger bot. He can answer questions about 5 teams of the french football league (Paris, Lille, Monaco, Marseille, Lyon).
The user intent is detected by DialogFlow, a Natural Language Processing plateform. Most of the answer are coming from a node.js application that provide information fetched from an API.


## Features
Amara can answer the following topics:
- Teams covered by Amara
- General information about a team
- Stadium of the team
- Next game information
- Previous match information
- Team's ranking in Ligue 1
- Roster and players

## Demo
https://github.com/michaelrasolo/amara-fb-bot/assets/127959644/64696db8-4657-44a0-b520-241e4276f439

If you want to test the bot, feel free to contact me at rasolon.michael@gmail.com so I can add you Facebook Developer profil to the app testers.

## Tech Stack
**Server:** Node, Express

**Natural Language Processing:** Google DialogFlow

**Chat App:** Facebook Messenger

**API:** api-football.com

**Hosting:** Vercel





## Get started

### Prerequisites

Before you begin, ensure you have the following prerequisites installed on your computer:

- [Node.js](https://nodejs.org/) - JavaScript runtime.
- [Nodemon](https://nodemon.io/) - (Assuming you have this installed globally).

### Installation
Clone this repository

```bash
  git clone https://github.com/michaelrasolo/amara-fb-bot.git
```

Install the dependencies

```bash
  yarn install
```
Run the application
```bash
  nodemon
```
Deploy temporary the application on ngrok, and use the URL provided
```bash
  ngrok http 5000
```
Or deploy permanently on Vercel to get a fixed URL for your server.
### DialogFlow 
- Create a DialogFlow agent and set up your bot's intents and entities.
- Manage the integration with Facebook Messenger, using the token from your developers.facebook.com app. Documentation can be found [here](https://cloud.google.com/dialogflow/es/docs/integrations/facebook?hl=fr).
- Set up the fullfillment using the URL of the server you deployed. Documentation for fullfillment and webhook can be found [here](https://cloud.google.com/dialogflow/es/docs/fulfillment-overview).

### Facebook Messenger 
- Create Facebook page.
- Create an app on developers.facebook.com and link it to your Facebook page
- Enable the product Messenger and generate a token.
- Set up the webhook using your DialogFlow agent URL and verified token.
## Environment Variables

To run this project, you will need to add an API key from api-football.com as environment variables to your .env file

`FOOTBALL_API_KEY`



