import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "catfact",
  aliases: ["cat-fact", "catFact"],
  run: async (client, message) => {
    try {
      const { data } = await axios.get("https://catfact.ninja/fact");
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Here's a cat fact!")
        .setDescription(data.fact)
        .setTimestamp();
      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      const errEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("We are sorry but...")
        .setDescription(`${err}`)
        .setTimestamp();
      return message.channel.send({ embeds: [errEmbed] });
    }
  },
};
