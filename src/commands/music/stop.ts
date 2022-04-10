import { MessageEmbed } from "discord.js";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "stop",
  aliases: ["s", "pause"],
  run: (client, message) => {
    const queue = client.distube?.getQueue(message);
    if (!queue) {
      return message.channel.send(`There is nothing in the queue right now!`);
    } else if (queue.paused) {
      queue.resume();
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("The song was already paused but I resumed it for you 😃")
        .setTimestamp();
      return message.channel.send({ embeds: [embed] });
    }
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("The queue has been stopped!")
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
    client.distube?.pause(message);
  },
};
