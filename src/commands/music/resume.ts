import { MessageEmbed } from "discord.js";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "resume",
  description: "Resumes the queue.",
  run: (client, interaction) => {
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
      queue.resume();
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("The song has been resumed!")
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
