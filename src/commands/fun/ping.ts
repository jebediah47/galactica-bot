import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "ping",
  aliases: ["p"],
  run: async (client, message, args) => {
    message.channel
      .send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`The bot's ping is **${client.ws.ping}**`)
          .setTimestamp()
      )
      .catch(console.error);
  },
};
