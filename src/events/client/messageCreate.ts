import type { Message } from "discord.js";
import type { Event } from "@/interfaces";

export const event: Event<"messageCreate"> = {
  name: "messageCreate",
  run: async (client, message: Message) => {
    if (!message.inGuild() || message.author.bot) return;
    await client.levels.giveXp(message);
  },
};
