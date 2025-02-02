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
    this._api.get("/config/presence", () => {
      return {
        presence: this._client.configManager.get("botPresence"),
        presence_type: this._client.configManager.get("botPresenceType"),
      }
    })
    this._api.post(
      "/config/presence",
      ({ body }) => {
        const { presence, presence_type } = body

        this._client.configManager.set("botPresence", presence)
        this._client.configManager.set("botPresenceType", presence_type)

        this._client.presenceManager.setPresence(
          this._client.configManager.get("botPresence"),
          this._client.configManager.get("botPresenceType"),
        )

        return {
          presence: this._client.configManager.get("botPresence"),
          presence_type: this._client.configManager.get("botPresenceType"),
        }
      },
      {
        body: t.Object({
          presence: t.String({ minLength: 1, maxLength: 96 }),
          presence_type: t.Number({ minimum: 0, maximum: 6 }),
        }),
      },
    )

    this._api.get("/", "If you're seeing this you're authorized")

    this._api.listen(GALACTICA_API_PORT, () => {
      this._client.logger.info(`API listening on port ${GALACTICA_API_PORT}`)
    })
  }
}
