import type { Event } from "@/interfaces";

export const event: Event<"clientReady"> = {
  name: "clientReady",
  run: async (client) => {
    await client.registerCommands({
      commands: client.slashCommands,
    });

    const guildConfigs = await client.prisma.guildConfigs.findMany();
    guildConfigs.forEach((config) => {
      client.configs.set(config.guildID, config);
    });

    client.logger.info(`We have logged in as ${client.user?.tag}`);

    client.presenceManager.setPresence(
      client.configManager.get("botPresence"),
      client.configManager.get("botPresenceType"),
    );
  },
};
