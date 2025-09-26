import type { ActivityType } from "discord-api-types/payloads/v10";
import type ExtendedClient from "@/client";

export class PresenceManager {
  private _client: ExtendedClient;

  public constructor(client: ExtendedClient) {
    this._client = client;
  }

  public setPresence(presence: string, presenceType: ActivityType): void {
    this._client.user?.setActivity(presence, {
      type: presenceType,
    });
    this._client.logger.info(
      `Presence set to ${presence} with type ${presenceType}`,
    );
  }
}
