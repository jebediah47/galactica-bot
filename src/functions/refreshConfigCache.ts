import type ExtendedClient from "../client";

export async function refreshConfigCache(client: ExtendedClient) {
  const freshConfigs = await client.prisma.guildConfigs.findMany();
  freshConfigs.forEach((config) => {
    client.configs.set(config.guildID, config);
  });
}
