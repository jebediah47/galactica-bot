import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "dictionary",
  description: "An urban dictionary on your fingertips.",
  options: [
    {
      name: "data",
      description: "INPUT",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    let query = args.getString("data");
    if (!query) return;

    try {
      query = encodeURIComponent(query);
      const {
        data: { list },
      } = await axios.get(
        `https://api.urbandictionary.com/v0/define?term=${query.toString()}`
      );
      const [answer] = list;

      const embed2 = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .addFields(
          { name: "Definition:", value: trim(answer.definition) },
          { name: "Example:", value: trim(answer.example) },
          {
            name: "Ratings",
            value: `${answer.thumbs_up} 👍   ${answer.thumbs_down} 👎`,
          }
        )
        .setTimestamp();
      await interaction.reply({ embeds: [embed2] });
    } catch (err) {
      const errEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Error!")
        .setDescription(`${err}`)
        .setTimestamp();
      return interaction.reply({ embeds: [errEmbed] });
    }
  },
};

function trim(input: string) {
  return input.length > 1024 ? `${input.slice(0, 1020)} ... ` : input;
}
