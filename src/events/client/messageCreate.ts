import { Message } from "discord.js";
import { Event } from "@/interfaces";

export const event: Event<"messageCreate"> = {
	name: "messageCreate",
	run: async (client, message: Message) => {
		if (!message.inGuild() || message.author.bot) return;
		await client.levels.giveXp(message);
		process.stdout.write(`\r${message.author.tag} has sent a message.\n`);
	},
};
