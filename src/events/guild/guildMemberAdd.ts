import type { Event } from "@/interfaces"
import type { GuildMember, TextChannel } from "discord.js"

export const event: Event<"guildMemberAdd"> = {
  name: "guildMemberAdd",
  run: async (client, member: GuildMember) => {
    if (client.configs.get(member.guild.id)?.modLogsIsEnabled) {
      const channel: TextChannel = member.guild.channels.cache.get(
        client.configs.get(member.guild.id)?.modLogsChannelID as string,
      ) as TextChannel

      if (!channel || member.user.tag === `${client.user?.tag}`) return

      await channel.send(`[LOGS] A new member has joined ${member.user.tag}`)
    }
  },
}
