import { MessageEmbed } from "discord.js";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "stop",
  description: "Stops the song currently playing",
  run: (client, interaction) => {
    // @ts-ignore
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
        .setTitle("The song was already paused but I resumed it for you 😃")
        .setTimestamp();
      return interaction.reply({ embeds: [embed] });
    }
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("The queue has been stopped!")
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
    // @ts-ignore
    client.distube?.pause(interaction);
  },
};
