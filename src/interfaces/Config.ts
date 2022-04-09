import { ActivityTypes } from "discord.js/typings/enums";
import { ExcludeEnum } from "discord.js";

export interface Config {
  TOKEN: string;
  PREFIX: string;
  BOT_PRESENCE: string;
  BOT_PRESENCE_TYPE: ExcludeEnum<typeof ActivityTypes, "CUSTOM">;
  MODLOGS_CHANNEL_NAME: string;
}
