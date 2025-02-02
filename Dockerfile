FROM oven/bun:alpine as base
WORKDIR /usr/src/app
COPY LICENSE .
COPY tsconfig.json .
COPY package.json .
COPY src src
COPY prisma prisma

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist dist

USER bun
ENTRYPOINT [ "bun", "run", "dist/src/main.js" ]
