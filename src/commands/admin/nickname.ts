import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "nickname",
  description: "Enables you to change other's nicknames.",
  options: [
    {
      name: "user",
      description: "The user to have his nickname changed",
      type: "USER",
      required: true,
    },
    {
      name: "nickname",
      description: "The new nickname to be set",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const user: any = args.getMember("user");
    const usr = args.getUser("user");
    const nickname = args.getString("nickname");
    if (!user || !nickname) return;
    if (!interaction.member.permissions.has("MANAGE_NICKNAMES")) {
      return interaction.reply({
        content: "You are not permitted to use this command!",
      });
    }
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Changed the username of ${usr?.tag} to ${nickname}`)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
    user.setNickname(nickname);
  },
};
