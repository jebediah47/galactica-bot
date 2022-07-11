import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "resetnickname",
  description: "Resets any users nickname to hist original username.",
  options: [
    {
      name: "user",
      description: "The user to have his nickname reset",
      type: "USER",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const user: any = args.getMember("user");
    const usr = args.getUser("user");
    if (!user) return;
    if (!interaction.member.permissions.has("MANAGE_NICKNAMES")) {
      return interaction.reply({
        content: "You are not permitted to use this command!",
      });
    }
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Resetted ${usr?.tag}'s nickname`)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
    user.setNickname(null);
  },
};
