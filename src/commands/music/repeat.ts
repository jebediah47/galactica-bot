/* eslint-disable prettier/prettier */
import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "repeat",
  aliases: ["rp", "loop"],
  run: (client, message, args) => {
    const queue = client.distube?.getQueue(message);
    if (!queue) return message.channel.send(`There is nothing playing!`);
    let mode = null;
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
          `To enable repeat you need to mention one of the following modes \n\n` +
           "\`0\` **off** \n" +
            "This is self explanatory, it switches the repeat mode off. \n" +
           "\`1\` **song** \n" +
            "This mode will enable the repeat mode only in the currently playing song. \n" +
           "\`2\` **queue** \n" +
            "This one will enable repeat mode throughout the queue."
        )
        .setTimestamp();
        return message.channel.send({ embeds: [embed] })
    }
    //@ts-ignore
    mode = queue.setRepeatMode(mode);
    mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";
    message.channel.send(`Set repeat mode to \`${mode}\``);
  },
};
