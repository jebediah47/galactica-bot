import { EmbedBuilder } from "discord.js";
import axios from "axios";
import { Command } from "@/interfaces";
import { capitalize } from "@/functions";

export const command: Command = {
  name: "bored",
  description: "Suggests you something to cure your boredom.",
  run: async (client, interaction) => {
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
