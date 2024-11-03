import { Elysia } from "elysia";
import { apollo } from "@elysiajs/apollo";
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
    this._api.use(
      apollo({
        typeDefs: schema,
        resolvers: resolvers(this._client),
      }),
    );

    const API_PORT = process.env.GALACTICA_API_PORT || 3000;

    this._api.listen(API_PORT, () => {
      this._client.logger.info(`API listening on port ${API_PORT}`);
    });
  }
}
