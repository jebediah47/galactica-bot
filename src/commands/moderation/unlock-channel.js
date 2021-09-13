/* eslint-disable */
const { MessageEmbed } = require("discord.js");

exports.command = {
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
    const unlockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

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
