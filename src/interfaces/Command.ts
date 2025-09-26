import type {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
} from "discord.js";
import type Client from "../client";

export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember;
}

type Run = (
  client: Client,
  interaction: ExtendedInteraction,
  args: CommandInteractionOptionResolver,
  ...extra: unknown[]
) => void;

export type Command = {
  description?: string;
  run: Run;
} & ChatInputApplicationCommandData;
