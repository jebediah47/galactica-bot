import { MessageEmbed, MessageReaction } from "discord.js";
import { Command } from "../../interfaces";
import { setTimeout } from "node:timers";

export const command: Command = {
  name: "shutdown",
  aliases: ["poweroff"],
  run: (client, message) => {
    if (!message.member?.permissions.has("ADMINISTRATOR")) {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Notice!")
        .setDescription("You are not permitted to use this command!")
        .setTimestamp();
      return message.channel.send({ embeds: [embed] });
    }
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("🔌 Shutdown bot")
      .setDescription("React to the emoji below to shut down the bot!")
      .setFooter({
        text: "You have 15 seconds to interact before timeout",
      })
      .setTimestamp();
    message.channel.send({ embeds: [embed] }).then((msg) => {
      msg.react("✅");
      async function editEmbed(x = new MessageEmbed()) {
        msg.reactions.removeAll();
        x.setColor("RANDOM")
          .setTitle("Timeout")
          .setDescription("15 seconds have passed and no reactions were sent.")
          .setTimestamp();
        (await msg).edit({ embeds: [x] });
      }
      const id = setTimeout(editEmbed, 15000);
      const filter = (reaction: MessageReaction, user: { id: string }) => {
        return reaction.emoji.name === "✅" && user.id === message.author.id;
      };
      const collector = msg.createReactionCollector({
        filter,
        time: 15000,
      });
      collector.on("collect", () => {
        clearTimeout(id);
        process.exit();
      });
    });
  },
};
