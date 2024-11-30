import type { Event } from "@/interfaces"
import type { GuildMember, PartialGuildMember, TextChannel } from "discord.js"

export const event: Event<"guildMemberRemove"> = {
  name: "guildMemberRemove",
  run: async (client, member: GuildMember | PartialGuildMember) => {
    if (!member.partial) {
      if (client.configs.get(member.guild.id)?.modLogsIsEnabled === true) {
        const channel: TextChannel = member.guild.channels.cache.get(
          client.configs.get(member.guild.id)?.modLogsChannelID as string,
        ) as TextChannel

        if (!channel || member.user.tag === `${client.user?.tag}`) return

        await channel.send(`[LOGS] A member has left ${member.user.tag}`)
      }
    }
  },
}
