import { Command } from "../../interfaces";
import { EmbedBuilder } from "discord.js";
import { stdout } from "process";

export const command: Command = {
  name: "ping",
  description: "Replies with the bot's ping.",
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(`The bot's ping is **${client.ws.ping}**`)
      .setTimestamp();
    await interaction
      .reply({ embeds: [embed] })
      .catch((err) => stdout.write(err));
  },
};
