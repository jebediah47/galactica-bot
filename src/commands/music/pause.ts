import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "pause",
  description: "Pauses the song currently playing",
  run: async (client, interaction) => {
    const db = await client.prisma.guildConfigs.findUnique({
      where: {
        guildID: `${interaction.guild?.id}`,
      },
      select: {
        musicIsEnabled: true,
      },
    });
    if (db?.musicIsEnabled) {
      const queue = client.distube?.getQueue(interaction);
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
        const errEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("❌ Error!")
          .setDescription(`${err}`)
          .setTimestamp();
        return interaction.reply({ embeds: [errEmbed] });
      }
      await interaction.reply({ content: "The queue has been paused." });
      client.distube?.pause(interaction);
    } else {
      return interaction.reply({
        content: "Music commands have been disabled by the owner.",
      });
    }
  },
};
