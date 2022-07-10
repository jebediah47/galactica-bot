#!/bin/sh
# Entering the bot's direcotory.
cd /root/galactica-bot

# Intalling ALL packages.
npm install

# Building the bot and running it.
npm run build && node ./dist/src/main.js
