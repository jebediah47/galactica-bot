import { MODLOGS_CHANNEL_NAME } from "../../../config.json";
import { MessageEmbed, TextChannel } from "discord.js";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "listban",
  aliases: ["banlist", "banslist", "listbans"],
  run: async (client, message, args) => {
    const channel: TextChannel = message.guild.channels.cache.find(
      (ch) => ch.name === MODLOGS_CHANNEL_NAME
    ) as TextChannel;

    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Notice!")
          .setDescription("You are not permitted to use this command!")
          .setTimestamp()
      );
    }

    if (channel) {
      const getBans = message.guild.fetchBans();
      const membersBanned = (await getBans)
        .map((members) => `\`${members.user.tag}\``)
        .join(", ");

      if (!membersBanned) {
        return message.channel.send(
          new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Notice!")
            .setDescription("There are no members banned on this server!")
            .setTimestamp()
        );
      }
      channel.send([`${message.author.toString()}`, membersBanned]);
    } else if (!channel) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Notice!")
          .setDescription(
            `${message.author.toString()} Could not find the mod-logs channel make sure that you have added it on the config file of the bot!`
          )
          .setTimestamp()
      );
    }
  },
};
