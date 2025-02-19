import type { Event } from "@/interfaces"
import type { Message } from "discord.js"

export const event: Event<"messageCreate"> = {
  name: "messageCreate",
  run: async (client, message: Message) => {
    if (!message.inGuild() || message.author.bot) return
    await client.levels.giveXp(message)
  },
}
