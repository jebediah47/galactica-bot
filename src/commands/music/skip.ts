import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "skip",
  aliases: ["s", "skp"],
  run: async (client, message) => {
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
      await client.distube?.skip(message);
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("✅ Success!")
        .setDescription("Skipped song!")
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      return message.channel.send(`${err}`);
    }
  },
};
