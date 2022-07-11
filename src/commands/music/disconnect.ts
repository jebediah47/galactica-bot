import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "disconnect",
  description: "Disconnects the bot from current voice channel.",
  run: async (client, interaction) => {
    if (client.config.MUSIC_IS_ENABLED) {
      if (client.distube?.voices.has(interaction)) {
        client.distube?.voices.leave(interaction);
        await interaction.reply({ content: "👋" });
      } else {
        const noVoiceChannel = new MessageEmbed()
          .setColor("RANDOM")
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
