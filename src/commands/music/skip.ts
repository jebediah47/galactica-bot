import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "skip",
  description: "Skips a one song in the queue.",
  run: async (client, interaction) => {
    // @ts-ignore
    const queue = client.distube?.getQueue(interaction);
    if (!queue) {
      const noQueue = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Error!")
        .setDescription("There is nothing in queue!")
        .setTimestamp();
      return interaction.reply({ embeds: [noQueue] });
    }
    try {
      // @ts-ignore
      await client.distube?.skip(interaction);
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("✅ Success!")
        .setDescription("Skipped song!")
        .setTimestamp();
      interaction.reply({ embeds: [embed] });
    } catch (err) {
      const errEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Error!")
        .setDescription(`${err}`)
        .setTimestamp();
      return interaction.reply({ embeds: [errEmbed] });
    }
  },
};
