FROM archlinux:latest

RUN pacman -Syyu git nodejs npm typescript python3 --noconfirm
RUN pacman-key --init
RUN pacman-key --populate archlinux

WORKDIR /root/
COPY config.json .
COPY build.sh .
COPY build.js .
COPY src src
COPY tsconfig.json .
COPY package.json .

RUN ["chmod", "+x", "root/build.sh"]

ENTRYPOINT ["./root/build.sh"]