import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { GuildIdResolvable } from "distube";
import { Command } from "../../interfaces";
import { isInteger } from "mathjs";

export const command: Command = {
  name: "seek",
  description: "Seek to any part of the track currently playing.",
  options: [
    {
      name: "time",
      description: "Enter the time to seek (number of seconds)",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    if (client.configs.get(interaction.guildId!)?.musicIsEnabled) {
      let time: number | null = args.getString("time") as unknown as number;
      if (!time) return;
      const queue = client.distube.getQueue(interaction as GuildIdResolvable);
      try {
        time = Number(time);
        if (!isInteger(time)) {
          const embed = new EmbedBuilder()
            .setColor("Random")
            .setDescription("Please enter a valid number!")
            .setTimestamp();
          return interaction.reply({ embeds: [embed] });
        }
        queue?.seek(time);
        const seekSuccess = new EmbedBuilder()
          .setColor("Random")
          .setDescription(`Seeked song to \`${time}\` seconds.`)
          .setTimestamp();
        await interaction.reply({ embeds: [seekSuccess] });
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
