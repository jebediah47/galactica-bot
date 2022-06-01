import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "avatar",
  description: "Displays the mentioned user's avatar.",
  options: [
    {
      name: "user",
      description: "Mention any user for his avatar to be displayed.",
      type: "USER",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const user = args.getUser("user") || interaction.user;
    const embed = new MessageEmbed()
      .setAuthor({
        name: `${user.tag} 's avatar`,
      })
      .setTimestamp()
      .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
