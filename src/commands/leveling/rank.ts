import { Command } from "@/interfaces";

export const command: Command = {
  name: "rank",
  description: "Sends the user's rank in the server.",
  run: async (client, interaction) => {
    await client.levels.getUserStats(interaction);
  },
};
