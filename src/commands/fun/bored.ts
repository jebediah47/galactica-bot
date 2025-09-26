import axios from "axios";
import { EmbedBuilder } from "discord.js";
import { capitalize } from "@/functions";
import type { Command } from "@/interfaces";

export const command: Command = {
  name: "bored",
  description: "Suggests you something to cure your boredom.",
  run: async (_client, interaction) => {
    try {
      const { data } = await axios.get("http://www.boredapi.com/api/activity");
      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Here's something for you to do!")
        .setDescription(data.activity)
        .addFields(
          { name: "Type", value: capitalize(`${data.type}`) },
          { name: "Participants", value: `\`${data.participants}\`` },
        )
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
