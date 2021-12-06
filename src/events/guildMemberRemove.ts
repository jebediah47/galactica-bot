import { stdout } from "process";
import { Event } from "../interfaces";

export const event: Event = {
  name: "guildMemberRemove",
  run: async (client, member) => {
    try {
      const channel = member.guild.channels.cache.find(
        (c) => c.name == client.config.MODLOGS_CHANNEL_NAME
      );
      channel.send(`[LOGS] A new member has left ${member.user.tag}`);
    } catch (err) {
      stdout.write(
        "A problem has occurred please check you config.json file on the MODLOGS_CHANNEL_NAME parameter and see if you have typed a wrong channel name \n"
      );
    }
  },
};
