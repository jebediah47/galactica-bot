import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "@/interfaces";

export const command: Command = {
  name: "echo",
  description: "Echoes the input just like BASH.",
  options: [
    {
      name: "input",
      description: "The input to be echoed",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    await interaction.reply({ content: `${args.getString("input")}` });
  },
};
