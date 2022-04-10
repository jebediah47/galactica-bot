import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import { stdout } from "process";

export const command: Command = {
  name: "ping",
  aliases: ["pp"],
  run: async (client, message) => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`The bot's ping is **${client.ws.ping}**`)
      .setTimestamp();
    message.channel.send({ embeds: [embed] }).catch((err) => stdout.write(err));
  },
};
