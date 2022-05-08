import { MessageEmbed, MessageReaction } from "discord.js";
import { setTimeout } from "timers";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "clear",
  aliases: ["purge", "cls"],
  run: async (client, message, args) => {
    const newEmbed1 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You are not permitted to clear messages")
      .setDescription(
        "You need to have the permission to delete messages in order to purge/clear messages"
      )
      .setTimestamp();

    const newEmbed2 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Please enter a `DECIMAL` number")
      .setDescription(
        "You need to enter a `DECIMAL` number in order for the command to work"
      )
      .setTimestamp();

    const newEmbed3 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Please delete less than `100` messages at a time!")
      .setDescription("You cannot delete more than `100` messages at a time!")
      .setTimestamp();

    const newEmbed4 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("No `amount` of messages to delete")
      .setDescription(
        "Please enter the `amount` of messages that you want to clear"
      )
      .setTimestamp();

    const newEmbed5 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("You can't delete `0` messages at a time!")
      .setDescription("You must delete at least `one` message at a time")
      .setTimestamp();

    const newEmbed6 = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Messages have been cleared")
      .setDescription(`Cleared ${args[0]} messages!`)
      .setTimestamp();

    if (!message.member?.permissions.has("MANAGE_MESSAGES"))
      return message.reply({ embeds: [newEmbed1] });
    if (isNaN(args[0])) return message.reply({ embeds: [newEmbed2] });

    if (args[0] > 100) return message.reply({ embeds: [newEmbed3] });
    if (!args[0]) return message.reply({ embeds: [newEmbed4] });
    if (args[0] < 1) return message.reply({ embeds: [newEmbed5] });
    await message.channel.messages
      .fetch({ limit: args[0] })
      .then(async (messages) => {
        if (message.channel.type === "GUILD_TEXT")
          message.channel.bulkDelete(messages).catch(async (err) => {
            const embed = new MessageEmbed()
              .setColor("RANDOM")
              .setDescription(`${err}`)
              .setTimestamp();
            (await success).delete();
            const errReply = message.reply({ embeds: [embed] });
            async function errReplyTimeout() {
              (await errReply).delete();
            }
            setTimeout(errReplyTimeout, 15000);
          });
        const success = message.channel.send({ embeds: [newEmbed6] });
        (await success).react("✅");
        const filter = (reaction: MessageReaction, user: { id: string }) => {
          return reaction.emoji.name === "✅" && user.id === message.author.id;
        };
        const collector = (await success).createReactionCollector({
          filter,
          time: 30000,
        });
        collector.on("collect", async () => {
          (await success).delete();
        });
      });
  },
};
