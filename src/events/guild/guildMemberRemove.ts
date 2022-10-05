import { GuildMember, TextChannel } from "discord.js";
import { Event } from "../../interfaces";

export const event: Event = {
  name: "guildMemberRemove",
  run: async (client, member: GuildMember) => {
    if (client.configs.get(member.guild.id)?.modLogsIsEnabled === true) {
      const channel: TextChannel = member.guild.channels.cache.get(
        client.configs.get(member.guild.id)?.modLogsChannelID as string
      ) as TextChannel;

      if (!channel || member.user.tag === `${client.user?.tag}`) {
        return;
      }

      await channel.send(`[LOGS] A member has left ${member.user.tag}`);
    }
  },
};
