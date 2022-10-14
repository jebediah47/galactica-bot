import { ActivityType } from "discord.js";

export interface Config {
  BOT_PRESENCE: string;
  BOT_PRESENCE_TYPE: ActivityType | ActivityType.Custom;
}
