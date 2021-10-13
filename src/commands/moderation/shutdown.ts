import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "shutdown",
  aliases: [],
  run: async (client, message) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Notice!")
        .setDescription("You are not permitted to run this command!")
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    }

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Shutting down!")
      .setDescription("Click on the reaction to shut down the bot!")
      .setTimestamp();
    const msg = message.channel.send({ embeds: [embed] });
    (await msg).react("✅");

    const filter = (reaction, user) => {
      return reaction.emoji.name === "✅" && user.id === message.author.id;
    };

    const collector = (await msg).createReactionCollector({
      filter,
      time: 15000,
    });

    collector.on("collect", () => {
      console.log("Shutting down...");
      process.exit();
    });
  },
};
