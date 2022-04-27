import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "avatar",
  aliases: ["pfp"],
  run: (client, message) => {
    const user = message.mentions.users.first() || message.author;
    const embed = new MessageEmbed()
      .setAuthor({
        name: `${user.tag} 's avatar`,
      })
      .setTimestamp()
      .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  },
};
