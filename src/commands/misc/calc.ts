import type { Command } from "@/interfaces";
import { calc } from "../../functions";

export const command: Command = {
  name: "calc",
  description: "Evaluates math problems.",
  run: async (_client, interaction) => {
    await interaction.deferReply();
    await calc(interaction);
  },
};
