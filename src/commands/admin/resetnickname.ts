import type { Command } from "@/interfaces"
import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  type GuildMember,
} from "discord.js"

export const command: Command = {
  name: "resetnickname",
  description: "Resets any users nickname to hist original username.",
  options: [
    {
      name: "user",
      description: "The user to have his nickname reset",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  run: async (_client, interaction, args) => {
    const user: GuildMember = args.getMember("user") as GuildMember
    const usr = args.getUser("user")
    if (!user) return
    if (!interaction.member.permissions.has("ManageNicknames")) {
      return interaction.reply({
        content: "You are not permitted to use this command!",
      })
    }
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(`Resetted ${usr?.tag}'s nickname`)
      .setTimestamp()
    await interaction.reply({ embeds: [embed] })
    await user.setNickname(null)
  },
}
