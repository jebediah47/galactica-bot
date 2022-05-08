//@ts-ignore
import * as TicTacToe from "discord-tictactoe";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "tictactoe",
  aliases: [],
  run: (client, message) => {
    const game = new TicTacToe({ language: "en" });
    game.handleMessage(message);
  },
};
