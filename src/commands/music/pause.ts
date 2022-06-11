import { MessageEmbed } from "discord.js";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "pause",
  description: "Pauses the song currently playing",
  run: async (client, interaction) => {
    const queue = client.distube?.getQueue(interaction);
    if (!queue) {
      const noQueue = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Error!")
        .setDescription("There is nothing in the queue right now!")
        .setTimestamp();
      return interaction.reply({ embeds: [noQueue] });
    } else if (queue.paused) {
      queue.resume();
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(
          "The song was already paused but I resumed it for you 😃"
        )
        .setTimestamp();
      return interaction.reply({ embeds: [embed] });
    }
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription("The queue has been stopped!")
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
    client.distube?.pause(interaction);
  },
};
