import type { ChatInputCommandInteraction } from "discord.js";
import TicTacToe from "discord-tictactoe";
import type { Command } from "@/interfaces";

export const command: Command = {
  name: "tictactoe",
  description: "Creates a Tic-Tac-Toe game with an AI as the opponent.",
  run: async (_client, interaction) => {
    const game = new TicTacToe({ language: "en" });
    await game.handleInteraction(interaction as ChatInputCommandInteraction);
  },
};
