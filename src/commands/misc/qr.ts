import { Command } from "@/interfaces"
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js"

export const command: Command = {
  name: "qr",
  description: "Generates a QR-code using inputted data.",
  options: [
    {
      name: "data",
      description: "Input data to be converted to a QR-code",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (_client, interaction, args) => {
    let text = args.getString("data")
    if (!text) return
    try {
      await interaction.reply(
        "Please wait while your text is converted to QR-code",
      )
      text = encodeURIComponent(text)
      const embed1 = new EmbedBuilder()
        .setImage(
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`,
        )
        .setColor("Random")
        .setTimestamp()
      await interaction.editReply({ embeds: [embed1] })
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
