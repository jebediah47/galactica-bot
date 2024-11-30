import type { Command } from "@/interfaces"
import {
  ApplicationCommandOptionType,
  ChannelType,
  EmbedBuilder,
} from "discord.js"
import { isInteger } from "mathjs"

export const command: Command = {
  name: "clear",
  description:
    "Deletes specified number of messages that are up to 14 days old.",
  options: [
    {
      name: "msgnum",
      description: "Number of messages to be deleted.",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
  run: async (_client, interaction, args) => {
    const number = args.getInteger("messages")
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(`🧹 Deleted \`${number}\` messages!`)
      .setTimestamp()
    try {
      if (!number) return
      if (!isInteger(number)) {
        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("❌ Error!")
          .setDescription("The input must explicitly be an `INTEGER`")
          .setTimestamp()
        return interaction.reply({ embeds: [embed] })
      }
      if (!interaction.member.permissions.has("ManageMessages")) {
        return interaction.reply({
          content: "You are not permitted to use this command!",
        })
      }
      if (
        interaction.channel &&
        interaction.channel.type == ChannelType.GuildText
      )
        await interaction.channel.bulkDelete(number)
      await interaction.reply({ embeds: [embed] })
    } catch (err) {
      const errEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("❌ Error!")
        .setDescription(`${err}`)
        .setTimestamp()
      return interaction.reply({ embeds: [errEmbed] })
    }
  },
}
