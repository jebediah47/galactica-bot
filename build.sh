#!/bin/bash
cd /root/

mkdir galactica-bot

# file name vars
SRC="src"
TSCONFIG="tsconfig.json"
CONFIG="config.json"
PACKAGE="package.json"

# file exists message
FILE_EXISTS="file exists, ignoring."
DIR_EXISTS="directory exists, ignoring."

if test -d "$SRC"; then
    echo "$SRC, $DIR_EXISTS"
else
    cp -r src /root/galactica-bot/
fi

if test -f "$TSCONFIG"; then
    echo "$TSCONFIG, $FILE_EXISTS"
else
    cp tsconfig.json /root/galactica-bot/
fi

if test -f "$CONFIG"; then
    echo "$CONFIG, $FILE_EXISTS"
else
    cp config.json /root/galactica-bot/
fi

if test -f "$PACKAGE"; then
    echo "$PACKAGE, $FILE_EXISTS"
else
    cp package.json /root/galactica-bot/
fi

cd galactica-bot
npm install --only=production
tsc && node ./dist/src/main.js