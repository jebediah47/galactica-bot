import { ActivityTypes } from "discord.js/typings/enums";
import { ExcludeEnum } from "discord.js";

export interface Config {
  TOKEN: string;
  BOT_PRESENCE: string;
  MUSIC_IS_ENABLED: boolean;
  BOT_PRESENCE_TYPE: ExcludeEnum<typeof ActivityTypes, "CUSTOM"> | undefined;
  MODLOGS_CHANNEL_NAME: string;
  SERVER_OPTIONS: {
    ENABLED: boolean;
    PORT: number | null;
  };
}
