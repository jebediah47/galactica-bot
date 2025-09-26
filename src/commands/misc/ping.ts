import { stdout } from "node:process";
import { EmbedBuilder } from "discord.js";
import type { Command } from "@/interfaces";

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
