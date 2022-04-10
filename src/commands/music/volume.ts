import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "volume",
  aliases: ["v", "vol", "set-volume"],
  run: (client, message, args) => {
    const queue = client.distube?.getQueue(message);
    if (!queue) {
      return message.channel.send(`There is nothing in the queue right now!`);
    }
    const errEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Notice!")
      .setDescription(
        "You **must** enter a valid number from the range 1 - 100"
      )
      .setTimestamp();
    const volume = parseInt(args[0]);
    if (isNaN(volume) || !args[0])
      return message.channel.send({ embeds: [errEmbed] });

    if (volume > 100) {
      const errEmbed2 = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Volume cannot be over 100%")
        .setTimestamp();
      return message.channel.send({ embeds: [errEmbed2] });
    }
    queue.setVolume(volume);
    const volume_embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`🔊Set volume to \`${volume}\`%`)
      .setTimestamp();
    message.channel.send({ embeds: [volume_embed] });
  },
};
