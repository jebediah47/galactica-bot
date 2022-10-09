import { ActivityType } from "discord.js";
import { Event } from "../../interfaces";

export const event: Event = {
  name: "ready",
  run: async (client) => {
    await client.registerCommands({
      commands: client.slashCommands,
    });
    const guildConfigs = await client.prisma.guildConfigs.findMany();
    guildConfigs.forEach((config) =>
      client.configs.set(config.guildID, config)
    );
    process.stdout.write(`We have logged in as ${client.user!.tag} \n`);

    let activityType;
    switch (process.env.BOT_PRESENCE_TYPE) {
      case "PLAYING":
        activityType = ActivityType.Playing;
        break;
      case "STREAMING":
        activityType = ActivityType.Streaming;
        break;
      case "LISTENING":
        activityType = ActivityType.Listening;
        break;
      case "WATCHING":
        activityType = ActivityType.Watching;
        break;
      case "COMPETING":
        activityType = ActivityType.Competing;
        break;
    }

    client.user!.setActivity(`${process.env.BOT_PRESENCE}`, {
      type: activityType as
        | ActivityType.Playing
        | ActivityType.Streaming
        | ActivityType.Listening
        | ActivityType.Watching
        | ActivityType.Competing
        | undefined,
    });
  },
};
