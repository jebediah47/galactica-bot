import { GuildIdResolvable } from "distube";
import { Command } from "../../interfaces";
import { EmbedBuilder } from "discord.js";

export const command: Command = {
  name: "skip",
  description: "Skips a one song in the queue.",
  run: async (client, interaction) => {
    if (client.configs.get(interaction.guildId!)?.musicIsEnabled) {
      const queue = client.distube.getQueue(interaction as GuildIdResolvable);
      if (!queue) {
        return interaction.reply({
          content: "There is nothing currently playing in the queue!",
        });
      }
      try {
        await client.distube.skip(interaction as GuildIdResolvable);
        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("✅ Success!")
          .setDescription("Skipped song!")
          .setTimestamp();
        await interaction.reply({ embeds: [embed] });
      } catch (err) {
        const errEmbed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("❌ Error!")
          .setDescription(`${err}`)
          .setTimestamp();
        return interaction.reply({ embeds: [errEmbed] });
      }
    } else {
      return interaction.reply({
        content: "Music commands have been disabled by the owner.",
      });
    }
  },
};
