import { Command } from "@/interfaces"
import TicTacToe from "discord-tictactoe"
import { ChatInputCommandInteraction } from "discord.js"

export const command: Command = {
  name: "tictactoe",
  description: "Creates a Tic-Tac-Toe game with an AI as the opponent.",
  run: async (_client, interaction) => {
    const game = new TicTacToe({ language: "en" })
    await game.handleInteraction(interaction as ChatInputCommandInteraction)
  },
}
