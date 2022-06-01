import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "ban",
  description: "Enables you to ban a user.",
  options: [
    {
      name: "user",
      description: "Enter the user to be banned",
      type: "USER",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const member = args.getUser("user");
    //exception 1
    const newEmbed1 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("User has been successfully banned")
      .setDescription("Now this guy won't be a problem to us again!")
      .setTimestamp();

    //exception 2
    const newEmbed3 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You are not permitted to ban a member")
      .setDescription(
        "You need to have the ban permission in order to ban a member!"
      )
      .setTimestamp();

    if (!interaction.member.permissions.has("BAN_MEMBERS"))
      return interaction.reply({ embeds: [newEmbed3] });
    if (member) {
      const memberTarget = interaction.guild?.members.cache.get(member.id);
      memberTarget?.ban();
      interaction.reply({ embeds: [newEmbed1] });
    }
  },
};
