import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "dictionary",
  aliases: ["urban-dictionary"],
  run: async (client, message, args) => {
    let query: string = args.join(" ");
    if (!query) {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Notice!")
        .setDescription("Please enter a word to search for!")
        .setTimestamp();
      return message.reply({ embeds: [embed] });
    }

    try {
      query = encodeURIComponent(query);
      const {
        data: { list },
      } = await axios.get(
        `https://api.urbandictionary.com/v0/define?term=${query}`
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
      message.channel.send({ embeds: [embed2] });
    } catch (err) {
      message.channel.send("An error occurred. " + err);
    }
  },
};

function trim(input: string) {
  return input.length > 1024 ? `${input.slice(0, 1020)} ... ` : input;
}
