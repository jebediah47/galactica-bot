import RPS from "discord-rock-paper-scissor";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "rps",
  description:
    "Starts a rock-paper-scissors game with the bot as the opponent.",
  run: async (client, interaction) => {
    await interaction.reply(`RPS game, ${interaction.user.username} vs BOT`);
    const rps = new RPS();
    rps.solo(interaction, client);
  },
};
