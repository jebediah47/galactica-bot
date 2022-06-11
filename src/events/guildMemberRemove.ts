import { TextChannel } from "discord.js";
import { Event } from "../interfaces";

export const event: Event = {
  name: "guildMemberRemove",
  run: async (client, member) => {
    const channel: TextChannel = member.guild.channels.cache.find(
      (c: { name: string }) => c.name == client.config.MODLOGS_CHANNEL_NAME
    ) as TextChannel;

    if (!channel) {
      process.stderr.write(
        "MODLOGS_CHANNEL_NAME cannot be found, please check your config.json \n"
      );
    }
    await channel.send(`[LOGS] A member has left ${member.user.tag}`);
  },
};
