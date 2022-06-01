import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "repeat",
  description: "Disables or enables repeat mode.",
  options: [
    {
      name: "mode",
      description: "Sets the repeat mode",
      type: "STRING",
      required: true,
    },
  ],
  run: (client, interaction, args) => {
    const queue = client.distube?.getQueue(interaction);
    if (!queue) {
      const nothingPlaying = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Error!")
        .setDescription("There is nothing playing!")
        .setTimestamp();
      return interaction.reply({ embeds: [nothingPlaying] });
    }
    let mode;
    switch (args.getString("mode")) {
      case "off":
        mode = 0;
        break;
      case "song":
        mode = 1;
        break;
      case "queue":
        mode = 2;
        break;
    }
    if (!args.getString("mode")) return;
    try {
      mode = queue.setRepeatMode(mode);
      mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";
      const mode_embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Set repeat mode to \`${mode}\``)
        .setTimestamp();
      interaction.reply({ embeds: [mode_embed] });
    } catch (err) {
      return interaction.reply(`${err}`);
    }
  },
};
