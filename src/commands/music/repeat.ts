import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import { RepeatMode } from "distube";

export const command: Command = {
  name: "repeat",
  description: "Disables or enables repeat mode.",
  options: [
    {
      name: "mode",
      description: "Sets the repeat mode",
      type: "INTEGER",
      required: true,
      choices: [
        {
          name: "off",
          value: RepeatMode.DISABLED,
        },
        {
          name: "song",
          value: RepeatMode.SONG,
        },
        {
          name: "queue",
          value: RepeatMode.QUEUE,
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    if (client.config.MUSIC_IS_ENABLED) {
      const queue = client.distube?.getQueue(interaction);
      if (!queue) {
        const nothingPlaying = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("❌ Error!")
          .setDescription("There is nothing playing!")
          .setTimestamp();
        return interaction.reply({ embeds: [nothingPlaying] });
      }
      try {
        const loopMode = args.get("mode")?.value;
        queue.setRepeatMode(loopMode as RepeatMode);
        const mode =
          loopMode === RepeatMode.QUEUE
            ? "Repeat queue"
            : loopMode === RepeatMode.SONG
            ? "Repeat song"
            : "Off";
        const mode_embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`Set repeat mode to \`${mode}\``)
          .setTimestamp();
        await interaction.reply({ embeds: [mode_embed] });
      } catch (err) {
        return interaction.reply(`${err}`);
      }
    } else {
      return interaction.reply({
        content: "Music commands have been disabled by the owner.",
      });
    }
  },
};
