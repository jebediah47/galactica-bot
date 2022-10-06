import { GuildIdResolvable } from "distube";
import { Command } from "../../interfaces";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "pause",
  description: "Pauses the song currently playing",
  run: async (client, interaction) => {
    if (client.configs.get(interaction.guildId!)?.musicIsEnabled) {
      const queue = client.distube.getQueue(interaction as GuildIdResolvable);
      try {
        if (!queue) {
          return interaction.reply({
            content: "There is nothing currently playing in the queue!",
          });
        } else if (queue.paused) {
          queue.resume();
          return interaction.reply({
            content: "The song was already paused but I resumed it for you 😃",
          });
        }
      } catch (err) {
        const errEmbed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("❌ Error!")
          .setDescription(`${err}`)
          .setTimestamp();
        return interaction.reply({ embeds: [errEmbed] });
      }
      await interaction.reply({ content: "The queue has been paused." });
      client.distube.pause(interaction as GuildIdResolvable);
    } else {
      return interaction.reply({
        content: "Music commands have been disabled by the owner.",
      });
    }
  },
};
