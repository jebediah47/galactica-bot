import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "ping",
  aliases: ["p"],
  run: async (client, message) => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`The bot's ping is **${client.ws.ping}**`)
      .setTimestamp();
    message.channel.send({ embeds: [embed] }).catch(console.error);
  },
};
