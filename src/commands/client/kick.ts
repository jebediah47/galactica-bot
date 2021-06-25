import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "kick",
  aliases: [],
  run: (client, message) => {
    const member = message.mentions.users.first();

    //exception 1
    const newEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("User has been successfully kicked")
      .setDescription("Now this guy won't be a problem to us again")
      .setTimestamp();

    //exception 2
    const newEmbed2 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You need to mention a user in order to kick them")
      .setTimestamp();

    //exception 3
    const newEmbed3 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You are not permitted to kick a member")
      .setDescription(
        "You need to have the kick permission in order to kick a member"
      )
      .setTimestamp();

    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message
        .reply(newEmbed3)
        .then((message) => message.delete({ timeout: 10000 }));
    if (member) {
      const memberTarget = message.guild.members.cache.get(member.id);
      memberTarget.kick();
      message.channel
        .send(newEmbed)
        .then((message) => message.delete({ timeout: 10000 }));
    } else {
      message.channel
        .send(newEmbed2)
        .then((message) => message.delete({ timeout: 10000 }));
    }
  },
};
