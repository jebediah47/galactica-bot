import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "catfact",
  description: "Returns a random cat-fact.",
  run: async (client, interaction) => {
    try {
      const { data } = await axios.get("https://catfact.ninja/fact");
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Here's a cat fact!")
        .setDescription(data.fact)
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      const errEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("We are sorry but...")
        .setDescription(`${err}`)
        .setTimestamp();
      return interaction.reply({ embeds: [errEmbed] });
    }
  },
};
