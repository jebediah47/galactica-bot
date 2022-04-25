import { MessageEmbed } from "discord.js";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "resume",
  aliases: ["rs", "continue"],
  run: (client, message) => {
    const queue = client.distube?.getQueue(message);
    if (!queue) {
      const noQueue = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Error!")
        .setDescription("There is nothing in queue!")
        .setTimestamp();
      return message.channel.send({ embeds: [noQueue] });
    }
    try {
      queue.resume();
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("The song has been resumed!")
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      const errEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Error!")
        .setDescription(`${err}`)
        .setTimestamp();
      return message.channel.send({ embeds: [errEmbed] });
    }
  },
};
