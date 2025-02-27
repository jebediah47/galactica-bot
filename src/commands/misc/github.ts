import type { Command } from "@/interfaces"
import axios from "axios"
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js"

export const command: Command = {
  name: "github",
  description: "Shows a requested person's GitHub info.",
  options: [
    {
      name: "profile",
      description: "User's profile name",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (_client, interaction, args) => {
    const name = args.getString("profile")
    if (!name) return

    try {
      const { data } = await axios.get(`https://api.github.com/users/${name}`)
      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`${data.login}`)
        .setDescription(data.bio ? data.bio : "None")
        .addFields(
          {
            name: "💖 Followers",
            value: `\`\`\`${data.followers.toLocaleString()}\`\`\``,
            inline: true,
          },
          {
            name: "🏃 Following",
            value: `\`\`\`${data.following.toLocaleString()}\`\`\``,
            inline: true,
          },
          {
            name: "📚 Repositories",
            value: `\`\`\`${data.public_repos.toLocaleString()}\`\`\``,
            inline: true,
          },
          {
            name: "✉️ Email",
            value: `\`\`\`${data.email ? data.email : "None"}\`\`\``,
          },
          {
            name: "🏢 Company",
            value: `\`\`\`${data.company ? data.company : "None"}\`\`\``,
          },
          {
            name: "📍 Location",
            value: `\`\`\`${data.location ? data.location : "None"}\`\`\``,
          },
        )
        .setURL(data.html_url)
        .setThumbnail(data.avatar_url)
        .setTimestamp()

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
