import { Event, Command } from "../interfaces";
import { Message } from "discord.js";

export const event: Event = {
  name: "messageCreate",
  run: (client, message: Message) => {
    if (
      message.author.bot ||
      !message.guild ||
      !message.content.startsWith(client.config.PREFIX)
    )
      return;

    const args = message.content
      .slice(client.config.PREFIX.length)
      .trim()
      .split(/ +/g);

    const cmd = args.shift()?.toLowerCase();
    if (!cmd) return;
    const command = client.commands.get(cmd) || client.aliases.get(cmd);
    if (command) (command as Command).run(client, message, args);
  },
};
