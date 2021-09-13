/* eslint-disable */
const { MessageEmbed } = require("discord.js");

exports.command = {
  name: "lock-channel",
  aliases: ["channel-lock"],
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Notice!")
          .setDescription("You don't have the permission to use this command!")
          .setTimestamp()
      );
    }
    const lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

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
