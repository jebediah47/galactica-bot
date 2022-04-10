import { Command } from "../../interfaces";

export const command: Command = {
  name: "disconnect",
  aliases: ["leave"],
  run: (client, message) => {
    client.distube?.voices.leave(message);
    message.reply("👋");
  },
};
