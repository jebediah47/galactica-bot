import axios from "axios";
import { Command } from "@/interfaces";

export const command: Command = {
	name: "kanyewest",
	description: "Sends a random quote said by Kanye West",
	run: async (client, interaction) => {
		const { data } = await axios.get("https://api.kanye.rest/");
		await interaction.reply({ content: data.quote });
	},
};
