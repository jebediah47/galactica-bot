import translate = require("@iamtraction/google-translate");
import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "translate",
  aliases: ["trans", "langtrans", "google-translate"],
  run: async (client, message, args) => {
    const query = args.join(" ");
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("**Something went wrong...**")
      .setDescription(
        "Please specify a text to translate like the example below: \n `!translate {text}`"
      )
      .setTimestamp();

    if (!query) return message.reply({ embeds: [embed] });
    const translated = await translate(query, { to: "en" });
    const embed2 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("**This Translates to:**")
      .setDescription(translated.text)
      .setTimestamp();

    message.channel.send({ embeds: [embed2] });
  },
};
