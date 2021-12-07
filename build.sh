#!/bin/sh
cd /root/

mkdir galactica-bot
cp -r src /root/galactica-bot/
cp tsconfig.json /root/galactica-bot/
cp config.json /root/galactica-bot/
cp package.json /root/galactica-bot/

cd galactica-bot
npm install --only=production
tsc && node ./dist/src/main.js