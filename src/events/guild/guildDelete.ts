import { refreshConfigCache } from "@/functions"
import type { Event } from "@/interfaces"
import type { Guild } from "discord.js"

export const event: Event<"guildDelete"> = {
  name: "guildDelete",
  run: async (client, guild: Guild) => {
    const data = await client.prisma.guildConfigs.findUnique({
      where: {
        guildID: `${guild.id}`,
      },
      select: {
        guildID: true,
      },
    })
    if (data) {
      await client.prisma.guildConfigs.delete({
        where: {
          guildID: `${guild.id}`,
        },
      })
    }
    await refreshConfigCache(client)
  },
}
