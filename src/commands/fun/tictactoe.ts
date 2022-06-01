import * as TicTacToe from "discord-tictactoe";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "tictactoe",
  description: "Creates a Tic-Tac-Toe game with an AI as the opponent.",
  run: (client, interaction) => {
    const game = new TicTacToe({ language: "en" });
    game.handleInteraction(interaction);
  },
};
