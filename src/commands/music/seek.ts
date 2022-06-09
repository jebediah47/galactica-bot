import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import { isInteger } from "mathjs";

export const command: Command = {
  name: "seek",
  description: "Seek to any part of the track currently playing.",
  options: [
    {
      name: "time",
      description: "Enter the time to seek (number of seconds)",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    let time: any = args.getString("time");
    if (!time) return;
    const queue = client.distube?.getQueue(interaction);
    try {
      time = Number(time);
      if (!isInteger(time)) {
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setDescription("Please enter a valid number!")
          .setTimestamp();
        return interaction.reply({ embeds: [embed] });
      }
      queue?.seek(time);
    } catch (err) {
      const noQueue = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Error!")
        .setDescription("There is nothing in queue!")
        .setTimestamp();
      return interaction.reply({ embeds: [noQueue] });
    }
  },
};
