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
        .addField("Definition:", trim(answer.definition))
        .addField("Example:", trim(answer.example))
        .addField(
          "Ratings:",
          `${answer.thumbs_up} 👍   ${answer.thumbs_down} 👎`
        )
        .setTimestamp();
      await interaction.reply({ embeds: [embed2] });
    } catch (err) {
      return interaction.reply(
        "An error occurred. (This is probably because the requested word cannot be found.) " +
          err
      );
    }
  },
};

function trim(input: string) {
  return input.length > 1024 ? `${input.slice(0, 1020)} ... ` : input;
}
