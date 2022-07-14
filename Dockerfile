FROM alpine:latest

RUN apk --no-cache add nodejs npm ffmpeg
RUN [ "mkdir", "-p", "/root/galactica-bot" ]

WORKDIR /root/galactica-bot
COPY config.json .
COPY docker.build.sh .
COPY src src
COPY prisma prisma
COPY .env .
COPY tsconfig.json .
COPY package.json .

RUN ["npm", "install"]

RUN [ "chmod", "+x", "/root/galactica-bot/docker.build.sh" ]

EXPOSE 3001

ENTRYPOINT [ "/root/galactica-bot/docker.build.sh" ]
