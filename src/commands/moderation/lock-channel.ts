import { Command } from "../../interfaces";
import { MessageEmbed, TextChannel } from "discord.js";

export const command: Command = {
  name: "lock-channel",
  aliases: ["channel-lock"],
  run: async (client, message) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Notice!")
          .setDescription("You don't have the permission to use this command!")
          .setTimestamp()
      );
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const lockChannel: TextChannel =
      message.mentions.channels.first() || message.channel;

    if (
      message.guild.roles.everyone
        .permissionsIn(lockChannel)
        .missing(["SEND_MESSAGES"])
    ) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Notice!")
          .setDescription("The channel has already been locked :lock:")
          .setTimestamp()
      );
    }

    lockChannel
      .updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
      })
      .then(() => {
        return message.channel.send(
          new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Success!")
            .setDescription("The channel has been locked :lock:")
            .setTimestamp()
        );
      });
  },
};