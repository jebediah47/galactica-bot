import { MessageEmbed } from "discord.js";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "resume",
  description: "Resumes the queue.",
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
      if (!queue) {
        return interaction.reply({
          content: "There is nothing currently playing in the queue!",
        });
      }
      try {
        queue.resume();
        await interaction.reply({ content: "The queue has been resumed." });
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
