#!/bin/sh
# Entering the bot's direcotory.
cd /root/galactica-bot

# Run Prisma migration commands
npm run prisma migrate dev --create-only
npm run prisma migrate deploy

# Building the bot and running it.
npm run build && node ./dist/src/main.js
