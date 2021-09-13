import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import * as math from "mathjs";

export const command: Command = {
  name: "math",
  aliases: ["calc", "calculate"],
  run: (client, message, args) => {
    try {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .addField("Question", args.join(" "))
        .addField("Value", math.evaluate(args.join(" ")))
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      message.reply("Your question is not valid!");
    }
  },
};
