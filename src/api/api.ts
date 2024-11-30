import { createAuthRoutes } from "@/api/auth/routes"
import type ExtendedClient from "@/client"
import { GALACTICA_API_PORT } from "@/constants"
import { Elysia, t } from "elysia"

export class GalacticaBotAPI {
  private _client: ExtendedClient
  private _api = new Elysia({ prefix: "/api" })

  public constructor(client: ExtendedClient) {
    this._client = client
  }

  public async start() {
    this._api.use(createAuthRoutes(this._client))
    this._api.post(
      "/config/presence",
      ({ body }) => {
        const { bot_presence, bot_presence_type } = body

        if (
          typeof bot_presence_type === "number" &&
          (bot_presence_type < 0 || bot_presence_type > 6)
        ) {
          this._client.logger.error(
            "bot_presence_type must be >= 0 and <= 6. Not updating presence.",
          )
        } else {
          this._client.configManager.set("botPresence", bot_presence)
          this._client.configManager.set("botPresenceType", bot_presence_type)

          this._client.presenceManager.setPresence(
            this._client.configManager.get("botPresence"),
            this._client.configManager.get("botPresenceType"),
          )
        }

        return {
          bot_presence: this._client.configManager.get("botPresence"),
          bot_presence_type: this._client.configManager.get("botPresenceType"),
        }
      },
      {
        body: t.Object({
          bot_presence: t.String(),
          bot_presence_type: t.Number(),
        }),
      },
    )

    this._api.get("/", "If you're seeing this you're authorized")

    const API_PORT = GALACTICA_API_PORT

    this._api.listen(API_PORT, () => {
      this._client.logger.info(`API listening on port ${API_PORT}`)
    })
  }
}
