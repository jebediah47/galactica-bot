import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "repeat",
  aliases: ["rp", "loop"],
  run: (client, message, args) => {
    const queue = client.distube?.getQueue(message);
    if (!queue) {
      const nothingPlaying = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Error!")
        .setDescription("There is nothing playing!")
        .setTimestamp();
      return message.channel.send({ embeds: [nothingPlaying] });
    }
    let mode;
    switch (args[0]) {
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
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("No repeat options sent!")
        .setDescription(
          `To enable repeat you need to mention one of the following modes \n` +
            // eslint-disable-next-line prettier/prettier
           "\`0\` **off** \n" +
            "This is self explanatory, it switches the repeat mode off. \n" +
            // eslint-disable-next-line prettier/prettier
           "\`1\` **song** \n" +
            "This mode will enable the repeat mode only in the currently playing song. \n" +
            // eslint-disable-next-line prettier/prettier
           "\`2\` **queue** \n" +
            "This one will enable repeat mode throughout the queue."
        )
        .setTimestamp();
      return message.channel.send({ embeds: [embed] });
    }
    try {
      mode = queue.setRepeatMode(mode);
      mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";
      const mode_embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Set repeat mode to \`${mode}\``)
        .setTimestamp();
      message.channel.send({ embeds: [mode_embed] });
    } catch (err) {
      return message.channel.send(`${err}`);
    }
  },
};
