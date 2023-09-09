import Client from "../client";
import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
} from "discord.js";

export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember;
}

interface Run {
  (
    client: Client,
    interaction: ExtendedInteraction,
    args: CommandInteractionOptionResolver,
  ): void;
}

export type Command = {
  description?: string;
  run: Run;
} & ChatInputApplicationCommandData;
