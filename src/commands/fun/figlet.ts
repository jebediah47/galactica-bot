import util from "node:util";
import { ApplicationCommandOptionType } from "discord.js";
import figlet from "figlet";
import { Command } from "@/interfaces";

export const command: Command = {
	name: "figlet",
	description: "Creates figlet (ascii) art from input.",
	options: [
		{
			name: "input",
			description: "Input to be converted to ascii",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
	run: async (client, interaction, args) => {
		const fig = util.promisify(figlet);
		const input = args.getString("input");
		if (!input || input.length > 20) {
			return interaction.reply({
				content: "Input must be up to `20` characters!",
			});
		}
		await interaction.reply({ content: `\`\`\`${await fig(input)}\`\`\`` });
	},
};
