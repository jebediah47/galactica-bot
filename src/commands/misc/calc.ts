import { Command } from "../../interfaces";
import { calc } from "../../functions";

export const command: Command = {
  name: "calc",
  description: "Evaluates math problems.",
  run: async (client, interaction) => {
    await interaction.deferReply();
    calc(interaction);
  },
};
