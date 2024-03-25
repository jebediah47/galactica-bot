import { ActivityType } from "discord.js";
import { Event } from "@/interfaces";

export const event: Event<"ready"> = {
  name: "ready",
  run: async (client) => {
    await client.registerCommands({
      commands: client.slashCommands,
    });
    const guildConfigs = await client.prisma.guildConfigs.findMany();
    guildConfigs.forEach((config) =>
      client.configs.set(config.guildID, config),
    );
    process.stdout.write(`We have logged in as ${client.user!.tag} \n`);

    client.user!.setActivity(`${client.config.BOT_PRESENCE}`, {
      type: client.config.BOT_PRESENCE_TYPE as Exclude<
        ActivityType,
        ActivityType.Custom
      >,
    });
  },
};
