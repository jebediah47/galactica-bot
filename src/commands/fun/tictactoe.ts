import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../interfaces";
import TicTacToe from "discord-tictactoe";

export const command: Command = {
  name: "tictactoe",
  description: "Creates a Tic-Tac-Toe game with an AI as the opponent.",
  run: (client, interaction) => {
    const game = new TicTacToe({ language: "en" });
    game.handleInteraction(interaction as ChatInputCommandInteraction);
  },
};
