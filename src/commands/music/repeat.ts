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
        return interaction.reply({
          content: "There is nothing currently playing in the queue!",
        });
      }
      try {
        const loopMode = args.get("mode")?.value;
        queue.setRepeatMode(loopMode as RepeatMode);
        const mode =
          queue.repeatMode === 2
            ? "Repeat queue"
            : queue.repeatMode === 1
            ? "Repeat song"
            : "Off";
        const mode_embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`Set repeat mode to \`${mode}\``)
          .setTimestamp();
        await interaction.reply({ embeds: [mode_embed] });
      } catch (err) {
        const errEmbed = new MessageEmbed()
          .setColor("RANDOM")
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
