import type { Command } from "@/interfaces"
import { ApplicationCommandOptionType } from "discord.js"

export const command: Command = {
  name: "echo",
  description: "Echoes the input just like BASH.",
  options: [
    {
      name: "input",
      description: "The input to be echoed",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (_client, interaction, args) => {
    await interaction.reply({ content: `${args.getString("input")}` })
  },
}
