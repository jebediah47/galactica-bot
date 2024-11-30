import type { Command } from "@/interfaces"
import axios from "axios"

export const command: Command = {
  name: "kanyewest",
  description: "Sends a random quote said by Kanye West",
  run: async (_client, interaction) => {
    const { data } = await axios.get("https://api.kanye.rest/")
    await interaction.reply({ content: data.quote })
  },
}
