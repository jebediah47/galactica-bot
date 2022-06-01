import { Event } from "../interfaces";
import { TextChannel } from "discord.js";

export const event: Event = {
  name: "guildMemberAdd",
  run: async (client, member) => {
    const channel: TextChannel = member.guild?.channels.cache.find(
      (c: { name: string }) => c.name == client.config.MODLOGS_CHANNEL_NAME
    ) as TextChannel;

    if (!channel) {
      process.stderr.write(
        "MODLOGS_CHANNEL_NAME cannot be found, please check your config.json \n"
      );
    }
    channel.send(`[LOGS] A new member has joined ${member.user.tag}`);
  },
};
