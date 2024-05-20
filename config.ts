import { ActivityType } from "discord.js";

export let config = {
  BOT_PRESENCE: "Example",
  BOT_PRESENCE_TYPE: ActivityType.Watching,
};

export const updateConfig = (newConfig: typeof config) => {
  config = { ...config, ...newConfig };
};
