import * as pkg from "../../../package.json";
import { Command } from "../../interfaces";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "stats",
  description: "Displays some of the bot's and guild stats.",
  run: async (client, interaction) => {
    function formatMS(ms: number, noDetails?: boolean): string {
      const times: object = {
        week: Math.floor(ms / (1000 * 60 * 60 * 24 * 7)),
        day: Math.floor((ms / (1000 * 60 * 60 * 24)) % 7),
        hour: Math.floor((ms / (1000 * 60 * 60)) % 24),
        minute: Math.floor((ms / (1000 * 60)) % 60),
        second: Math.floor((ms / 1000) % 60),
      };

      let string = "";

      for (const [key, value] of noDetails === true
        ? Object.entries(times).filter(
            (value: [string, any]) =>
              value[0] != "hour" && value[0] != "minute" && value[0] != "second"
          )
        : Object.entries(times)) {
        if (value > 0) string += ` ${value} ${key}${value > 1 ? "s, " : ","}`;
      }
      return string
        .trim()
        .substring(0, string.trim().length - 1)
        .replace(/ {2}/gi, " ");
    }
    try {
      if (typeof client.uptime === "number") {
        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle(`Galactica bot stats!`)
          .setDescription(
            `
            Guilds: \`${client.guilds.cache.size.toLocaleString()}\`
            Users: \`${client.users.cache.size.toLocaleString()}\`
            Channels: \`${client.channels.cache.size.toLocaleString()}\`
            Uptime: \`${formatMS(client.uptime)}\`
            Discord API version: \`${
              client.options.rest?.version || "Unknown"
            }\`
            WebSocket Ping: \`${client.ws.ping}\`
            Bot Version: \`${pkg.version}\``
          )
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
      }
    } catch (err) {
      const errEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("❌ Error!")
        .setDescription(`${err}`)
        .setTimestamp();
      return interaction.reply({ embeds: [errEmbed] });
    }
  },
};
