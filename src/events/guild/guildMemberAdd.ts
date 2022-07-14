import { GuildMember, TextChannel } from "discord.js";
import { Event } from "../../interfaces";

export const event: Event = {
  name: "guildMemberAdd",
  run: async (client, member: GuildMember) => {
    const db = await client.prisma.guildConfigs.findUnique({
      where: {
        guildID: `${member.guild.id}`,
      },
      select: {
        modLogsIsEnabled: true,
        modLogsChannelID: true,
      },
    });
    if (db?.modLogsIsEnabled === true) {
      const channel: TextChannel = member.guild.channels.cache.get(
        db.modLogsChannelID as string
      ) as TextChannel;

      if (!channel || member.user.tag === `${client.user?.tag}`) {
        return;
      }

      await channel.send(`[LOGS] A new member has joined ${member.user.tag}`);
    }
  },
};
