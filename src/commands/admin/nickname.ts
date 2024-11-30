import type { Command } from "@/interfaces"
import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  type GuildMember,
} from "discord.js"

export const command: Command = {
  name: "nickname",
  description: "Enables you to change other's nicknames.",
  options: [
    {
      name: "user",
      description: "The user to have his nickname changed",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "nickname",
      description: "The new nickname to be set",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (_client, interaction, args) => {
    const user: GuildMember = args.getMember("user") as GuildMember
    const usr = args.getUser("user")
    const nickname = args.getString("nickname")
    if (!user || !nickname) return
    if (
      !interaction.member.permissions.has("ChangeNickname") ||
      !interaction.member.permissions.has("Administrator")
    ) {
      return interaction.reply({
        content: "You are not permitted to use this command!",
      })
    } else if (user.permissions.has("Administrator")) {
      return interaction.reply({
        content: "You can't change the nickname of an administrator!",
      })
    } else {
      const embed = new EmbedBuilder()
        .setColor("Random")
        .setDescription(`Changed the username of ${usr?.tag} to ${nickname}`)
        .setTimestamp()
      await interaction.reply({ embeds: [embed] })
      await user.setNickname(nickname)
    }
  },
}
