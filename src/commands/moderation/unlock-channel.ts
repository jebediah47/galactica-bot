import { Command } from "../../interfaces";
import { MessageEmbed, TextChannel } from "discord.js";

export const command: Command = {
  name: "unlock-channel",
  aliases: ["channel-unlock"],
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
    const unlockChannel: TextChannel =
      message.mentions.channels.first() || message.channel;

    if (
      message.guild.roles.everyone
        .permissionsIn(unlockChannel)
        .has(["SEND_MESSAGES"])
    ) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Notice!")
          .setDescription("The channel has already been unlocked :unlock:")
          .setTimestamp()
      );
    }

    unlockChannel
      .updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: true,
      })
      .then(() => {
        return message.channel.send(
          new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Success!")
            .setDescription("The channel has been unlocked :unlock:")
            .setTimestamp()
        );
      });
  },
};