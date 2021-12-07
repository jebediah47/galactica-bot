FROM archlinux:latest

RUN pacman -Syyu git nodejs npm typescript python3 --noconfirm
RUN pacman-key --init
RUN pacman-key --populate archlinux

COPY config.json root/
COPY build.sh root/
COPY src root/src
COPY tsconfig.json root/
COPY package.json root/

RUN ["chmod", "+x", "root/build.sh"]

ENTRYPOINT ["./root/build.sh"]