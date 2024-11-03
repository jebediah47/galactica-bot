import { Elysia } from "elysia";
import { apollo } from "@elysiajs/apollo";
import { bearer } from "@elysiajs/bearer";
import ExtendedClient from "@/client";
import resolvers from "@/api/resolvers";
import { schema } from "@/api/schema";

export class GalacticaBotAPI {
  private _client: ExtendedClient;
  private _api = new Elysia({ prefix: "/api" });

  public constructor(client: ExtendedClient) {
    this._client = client;
  }

  public async start() {
    if (!process.env.GALACTICA_API_BEARER) {
      this._client.logger.fatal(
        "No GALACTICA_API_BEARER provided in the environment, shutting down...",
      );
      process.exit(1);
    }

    this._api.use(bearer()).onBeforeHandle(({ bearer, set, request }) => {
      const url = new URL(request.url);
      if (
        process.env.NODE_ENV === "development" &&
        url.pathname.startsWith("/api/graphql")
      ) {
        return;
      }

      const isAuthorized = bearer === process.env.GALACTICA_API_BEARER;

      if (!isAuthorized || !bearer) {
        set.status = 400;
        set.headers["WWW-Authenticate"] =
          `Bearer realm='sign', error="invalid_request"`;
        this._client.logger.error("Unauthorized");
        throw new Error("Unauthorized");
      }
    });

    this._api.use(
      apollo({
        typeDefs: schema,
        resolvers: resolvers(this._client),
      }),
    );

    this._api.get("/", "If you're seeing this you're authorized");

    const API_PORT = process.env.GALACTICA_API_PORT || 3000;

    this._api.listen(API_PORT, () => {
      this._client.logger.info(`API listening on port ${API_PORT}`);
    });
  }
}
