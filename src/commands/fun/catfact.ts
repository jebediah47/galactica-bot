import { Command } from "../../interfaces";
import { EmbedBuilder } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "catfact",
  description: "Returns a random cat-fact.",
  run: async (client, interaction) => {
    try {
      const { data } = await axios.get("https://catfact.ninja/fact");
      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Here's a cat fact!")
        .setDescription(data.fact)
        .setTimestamp();
      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      const errEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("❌ Error!")
        .setDescription(`${err}`)
        .setTimestamp();
      return interaction.reply({ embeds: [errEmbed] });
    }
  },
};
