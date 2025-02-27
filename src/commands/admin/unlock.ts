import type { Command } from "@/interfaces"
import {
  ApplicationCommandOptionType,
  type GuildChannel,
  type Role,
  type RoleResolvable,
} from "discord.js"

export const command: Command = {
  name: "unlock",
  description: "Unlocks a locked channel.",
  options: [
    {
      name: "channel",
      description: "Channel name",
      type: ApplicationCommandOptionType.Channel,
      required: false,
    },
  ],
  run: async (_client, interaction, args) => {
    if (!interaction.member.permissions.has("ManageChannels")) {
      return interaction.reply({
        content: "You are not permitted to use this command!",
      })
    }
    const everyone: Role | undefined = interaction.guild?.roles.cache.find(
      (r) => r.name === "@everyone",
    )
    let channel: GuildChannel = args.getChannel("channel") as GuildChannel
    if (!channel) (channel as typeof interaction.channel) = interaction.channel
    await channel.permissionOverwrites.edit(everyone as RoleResolvable, {
      SendMessages: true,
    })
    await interaction.reply({
      content: "🔓 The channel has been unlocked",
    })
  },
}
