import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "kick",
  description: "Enables you to kick a user",
  options: [
    {
      name: "user",
      description: "Enter user to be kicked",
      type: "USER",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const member = args.getUser("user");

    //exception 1
    const newEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("User has been successfully kicked")
      .setDescription("Now this guy won't be a problem to us again!")
      .setTimestamp();

    //exception 2
    const newEmbed3 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You are not permitted to kick a member")
      .setDescription(
        "You need to have the kick permission in order to kick a member!"
      )
      .setTimestamp();

    if (!interaction.member.permissions.has("KICK_MEMBERS"))
      return interaction.reply({ embeds: [newEmbed3] });
    if (member) {
      const memberTarget = interaction.guild?.members.cache.get(member.id);
      memberTarget?.kick();
      interaction.reply({ embeds: [newEmbed] });
    }
  },
};
