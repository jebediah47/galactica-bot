import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "volume",
  aliases: ["v", "set-volume"],
  run: (client, message, args) => {
    const queue = client.distube?.getQueue(message);
    if (!queue) {
      return message.channel.send(`There is nothing in the queue right now!`);
    }
    const errEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Notice!")
      .setDescription(
        "You **must** enter a valid number from the ranmmge 1 - 100"
      )
      .setTimestamp();
    const volume = parseInt(args[0]);
    if (isNaN(volume) || !args[0])
      return message.channel.send({ embeds: [errEmbed] });
    queue.setVolume(volume);
    message.channel.send(`Volume set to \`${volume}\``);
  },
};
