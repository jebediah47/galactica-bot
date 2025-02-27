import type { Command } from "@/interfaces"
import { EmbedBuilder } from "discord.js"

export const command: Command = {
  name: "listcmds",
  description: "Lists all of the bot's commands.",
  run: async (client, interaction) => {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Random")
          .setTitle("These are all of the available commands.")
          .setDescription(
            client.commands.map((cmd) => `\`${cmd.name}\``).join(", "),
          ),
      ],
    })
  },
}
