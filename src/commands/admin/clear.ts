import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import { isInteger } from "mathjs";

export const command: Command = {
  name: "clear",
  description:
    "Deletes specified number of messages that are up to 14 days old.",
  options: [
    {
      name: "messages",
      description: "Messages to be deleted",
      type: "NUMBER",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const number: any = args.getNumber("messages");
    const channel = interaction.channel;
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`🧹 Deleted \`${number}\` messages!`)
      .setTimestamp();
    try {
      if (!number) return;
      if (!isInteger(number)) {
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Operation failure!")
          .setDescription("The input must explicitly be an `INTEGER`")
          .setTimestamp();
        return interaction.reply({ embeds: [embed] });
      }
      if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
        return interaction.reply({
          content: "You are not permitted to use this command!",
        });
      }
      if (channel?.type === "GUILD_TEXT") channel.bulkDelete(number, true);
      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      const errEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Operation failure")
        .setDescription(`Clear command failed with the following error: ${err}`)
        .setTimestamp();
      return interaction.reply({ embeds: [errEmbed] });
    }
  },
};
