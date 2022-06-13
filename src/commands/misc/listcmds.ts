import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "listcmds",
  description: "Lists all of the bot's commands.",
  run: async (client, interaction) => {
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("These are all of the available commands.")
          .setDescription(
            client.commands.map((cmd) => `\`${cmd.name}\``).join(", ")
          ),
      ],
    });
  },
};
