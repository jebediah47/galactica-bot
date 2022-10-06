import { Command } from "../../interfaces";
import { isInteger } from "mathjs";
import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  TextChannel,
} from "discord.js";

export const command: Command = {
  name: "clear",
  description:
    "Deletes specified number of messages that are up to 14 days old.",
  options: [
    {
      name: "messages",
      description: "Messages to be deleted",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const number: any = args.getNumber("messages");
    const channel = interaction.channel;
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(`🧹 Deleted \`${number}\` messages!`)
      .setTimestamp();
    try {
      if (!number) return;
      if (!isInteger(number)) {
        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("Operation failure!")
          .setDescription("The input must explicitly be an `INTEGER`")
          .setTimestamp();
        return interaction.reply({ embeds: [embed] });
      }
      if (!interaction.member.permissions.has("ManageMessages")) {
        return interaction.reply({
          content: "You are not permitted to use this command!",
        });
      }
      await (channel as TextChannel).bulkDelete(number, true);
      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      const errEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("❌ Error!")
        .setDescription(`${err}`)
        .setTimestamp();
      return interaction.reply({ embeds: [errEmbed] });
    }
  },
};
