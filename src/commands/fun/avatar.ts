import type { Command } from "@/interfaces"
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js"

export const command: Command = {
  name: "avatar",
  description: "Displays the mentioned user's avatar.",
  options: [
    {
      name: "user",
      description: "Mention any user for his avatar to be displayed.",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  run: async (_client, interaction, args) => {
    const user = args.getUser("user") || interaction.user
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${user.tag} 's avatar`,
      })
      .setTimestamp()
      .setImage(user.displayAvatarURL({ size: 4096, forceStatic: false }))
      .setTimestamp()
    await interaction.reply({ embeds: [embed] })
  },
}
