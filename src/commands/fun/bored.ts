import { capitalize } from "../../functions";
import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "bored",
  aliases: ["activity", "idea"],
  run: async (client, message) => {
    try {
      const { data } = await axios.get("https://www.boredapi.com/api/activity");
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Here's something for you to do!")
        .setDescription(data.activity)
        .setTimestamp();
      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      const errEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("We are sorry but...")
        .setDescription(`${err}`)
        .setTimestamp();
      return message.channel.send({ embeds: [errEmbed] });
    }
  },
};
