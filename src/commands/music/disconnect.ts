import { GuildIdResolvable } from "distube";
import { Command } from "../../interfaces";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "disconnect",
  description: "Disconnects the bot from current voice channel.",
  run: async (client, interaction) => {
    if (client.configs.get(interaction.guildId!)?.musicIsEnabled) {
      if (client.distube.voices.has(interaction as GuildIdResolvable)) {
        client.distube.voices.leave(interaction as GuildIdResolvable);
        await interaction.reply({ content: "👋" });
      } else {
        const noVoiceChannel = new EmbedBuilder()
          .setColor("Random")
          .setTitle("❌ Error!")
          .setDescription("The bot is not connected to any voice-channel!")
          .setTimestamp();
        return interaction.reply({ embeds: [noVoiceChannel] });
      }
    } else {
      return interaction.reply({
        content: "Music commands have been disabled by the owner.",
      });
    }
  },
};
