import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "ban",
  aliases: [],
  run: (client, message) => {
    const member = message.mentions.users.first();

    //exception 1
    const newEmbed1 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("User has been successfully banned")
      .setDescription("Now this guy won't be a problem to us again!")
      .setTimestamp();

    //exception 2
    const newEmbed2 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You need to mention a user in order to ban them!")
      .setTimestamp();

    //exception 3
    const newEmbed3 = new MessageEmbed()
      .setColor("RADNOM")
      .setTitle("You are not permitted to ban a member")
      .setDescription(
        "You need to have the ban permission in order to ban a member!"
      )
      .setTimestamp();

    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message
        .reply(newEmbed3)
        .then((message) => message.delete({ timeout: 10000 }));
    if (member) {
      const memberTarget = message.guild.members.cache.get(member.id);
      memberTarget.ban();
      message.channel
        .send(newEmbed1)
        .then((message) => message.delete({ timeout: 10000 }));
    } else {
      message.channel
        .send(newEmbed2)
        .then((message) => message.delete({ timeout: 10000 }));
    }
  },
};
