import {
	ChatInputApplicationCommandData,
	CommandInteraction,
	CommandInteractionOptionResolver,
	GuildMember,
} from "discord.js";
import Client from "../client";

export interface ExtendedInteraction extends CommandInteraction {
	member: GuildMember;
}

interface Run {
	(
		client: Client,
		interaction: ExtendedInteraction,
		args: CommandInteractionOptionResolver,
		...extra: any[]
	): void;
}

export type Command = {
	description?: string;
	run: Run;
} & ChatInputApplicationCommandData;
