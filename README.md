<p align="center"><a href="https://github.com/jebediah47/galactica-bot"><img src="https://i.imgur.com/obhS6zx.png" height="165"></a></p>

<h1 align="center">galactica-bot</h1>

<p align="center">A open-source Discord bot built with TypeScript</p>

<p align="center">
  <img src="https://www.codefactor.io/repository/github/jebediah47/galactica-bot/badge/main" alt="CodeFactor"></img>
  <img src="https://img.shields.io/github/workflow/status/jebediah47/galactica-bot/CodeQL" alt="Build Status"></img>
  <img src="https://img.shields.io/github/package-json/v/jebediah47/galactica-bot?color=red" alt="GitHub package.json version">
</p>

## 💭 What is Galactica?

[Galactica](https://github.com/jebediah47/galactica-bot) is a Discord bot built with TypeScript that can do various stuff using it's multiple commands!

## ⚡️ Fast Implementation

**Step 1**: Clone Galactica bot with git by running:

`
git clone https://github.com/jebediah47/galactica-bot
`

**Step 2**: Edit the `config.json` file and change:

```json
{
  "TOKEN": "YOUR_BOT_TOKEN",
  "PREFIX": "YOUR_BOT_PREFIX",
  "BOT_PRESENCE": "YOUR_BOT_PRESENCE",
  "MODLOGS_CHANNEL_NAME": "MODLOGS_CHANNEL_NAME"
}
```

💡 Quick tip: The `BOT_PRESENCE` option in `config.json` sets what Vibe's presence will be and the `MODLOGS_CHANNEL_NAME` sets the channel with moderation logs will be sent.

**Step 3**: Install all the required dependencies by running:

`
npm install
`

or with yarn:

`
yarn install
`

**Step 4**: Run the bot by running:

`
npm run dev
`

or with yarn:

`
yarn dev
`

## 🎉 You're ready!

### Expected output:

`
We have logged in as [your_bot_name#discriminator]
`

If you got this output you are ready to go!

<sup>Christian Llupo and contributors © 2022</sup>
