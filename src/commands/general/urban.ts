import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "urban",
  aliases: [],
  run: async (client, message, args) => {
    let query: any = args.join(" ");
    if (!query) {
      return message.reply(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Notice!")
          .setDescription("Please enter a word to search for!")
          .setTimestamp()
      );
    }

    query = encodeURIComponent(query);
    const {
      data: { list },
    } = await axios.get(
      `https://api.urbandictionary.com/v0/define?term=${query}`
    );
    const [answer] = list;

    message.channel.send(
      new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .addField("Definition:", trim(answer.definition))
        .addField("Example:", trim(answer.example))
        .addField(
          "Ratings:",
          `${answer.thumbs_up} 👍   ${answer.thumbs_down} 👎`
        )
        .setTimestamp()
    );
  },
};

function trim(input) {
  return input.length > 1024 ? `${input.slice(0, 1020)} ... ` : input;
}
