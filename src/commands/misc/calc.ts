import { calc } from "../../functions";
import { Command } from "@/interfaces";

export const command: Command = {
  name: "calc",
  description: "Evaluates math problems.",
  run: async (client, interaction) => {
    await interaction.deferReply();
    await calc(interaction);
  },
};
