import Client from "../client";
import { Message } from "discord.js";

interface Run {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (client: Client, message: Message, args: any[]);
}

export interface Command {
  name: string;
  description?: string;
  aliases?: string[];
  run: Run;
}
