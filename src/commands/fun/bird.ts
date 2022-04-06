import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "bird",
  aliases: ["birb"],
  run: async (client, message) => {
    try {
      const { data } = await axios.get(
        "https://api.monkedev.com/attachments/bird"
      );
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Here is a image of a bird!")
        .setImage(data.url)
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      const errEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("We are sorry but...")
        .setDescription(
          "An error has occurred while executing this command, please try running the command again later!"
        )
        .setTimestamp();
      return message.reply({ embeds: [errEmbed] });
    }
  },
};
