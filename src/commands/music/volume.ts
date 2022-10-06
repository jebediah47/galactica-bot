import { Command } from "../../interfaces";
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { isInteger } from "mathjs";
import { GuildIdResolvable } from "distube";

export const command: Command = {
  name: "volume",
  description: "Sets the volume of the queue.",
  options: [
    {
      name: "vol",
      description: "A value from 0 to 100",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    if (client.configs.get(interaction.guildId!)?.musicIsEnabled) {
      const queue = client.distube.getQueue(interaction as GuildIdResolvable);
      if (!queue) {
        return interaction.reply({
          content: "There is nothing currently playing in the queue!",
        });
      }
      const errEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Notice!")
        .setDescription(
          "You **must** enter a valid number from the range 1 - 100"
        )
        .setTimestamp();
      const volume: any = args.getNumber("vol");
      if (!isInteger(volume)) return interaction.reply({ embeds: [errEmbed] });

      if (volume > 100) {
        const errEmbed2 = new EmbedBuilder()
          .setColor("Random")
          .setTitle("Volume cannot be over 100%")
          .setTimestamp();
        return interaction.reply({ embeds: [errEmbed2] });
      }
      try {
        queue.setVolume(volume);
        const volume_embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle(`🔊Set volume to \`${volume}\`%`)
          .setTimestamp();
        await interaction.reply({ embeds: [volume_embed] });
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
