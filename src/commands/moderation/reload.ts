import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import glob = require("glob");

export const command: Command = {
  name: "reload",
  aliases: ["restart"],
  run: (client, message) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Notice!")
        .setDescription("You are not permitted to use this command!")
        .setTimestamp();
      return message.reply({ embeds: [embed] });
    }
    client.commands.sweep(() => true);
    glob(`${__dirname}/../**/.ts`, async (err, filePaths) => {
      if (err) return console.log(err);
      filePaths.forEach((file) => {
        delete require.cache[require.resolve(file)];

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const pull = require(file);

        if (pull.name) {
          console.log(`Reloaded ${pull.name} (cmd)`);
          client.commands.set(pull.name, pull);
        }

        if (pull.aliases && Array.isArray(pull.aliases)) {
          pull.aliases.forEach((alias) => {
            client.aliases.set(alias, pull.name);
          });
        }
      });
      const embed2 = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Success!")
        .setDescription("Reloaded commands!")
        .setTimestamp();
      message.channel.send({ embeds: [embed2] });
    });
  },
};
