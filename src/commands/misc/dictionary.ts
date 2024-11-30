import type { Command } from "@/interfaces"
import axios from "axios"
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js"

export const command: Command = {
  name: "dictionary",
  description: "An urban dictionary on your fingertips.",
  options: [
    {
      name: "data",
      description: "INPUT",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (_client, interaction, args) => {
    let query = args.getString("data")
    if (!query) return

    try {
      query = encodeURIComponent(query)
      const {
        data: { list },
      } = await axios.get(
        `https://api.urbandictionary.com/v0/define?term=${query.toString()}`,
      )
      const [answer] = list

      const embed2 = new EmbedBuilder()
        .setColor("Random")
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .addFields(
          { name: "Definition:", value: trim(answer.definition) },
          { name: "Example:", value: trim(answer.example) },
          {
            name: "Ratings",
            value: `${answer.thumbs_up} 👍   ${answer.thumbs_down} 👎`,
          },
        )
        .setTimestamp()
      await interaction.reply({ embeds: [embed2] })
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

function trim(input: string) {
  return input.length > 1024 ? `${input.slice(0, 1020)} ... ` : input
}
