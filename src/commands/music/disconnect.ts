import { Command } from "../../interfaces";

export const command: Command = {
  name: "disconnect",
  description: "Disconnects the bot from current voice channel.",
  run: (client, interaction) => {
    // @ts-ignore
    client.distube?.voices.leave(interaction);
    interaction.reply("👋");
  },
};
