import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "crypto-status",
  aliases: [],
  run: async (client, message, args) => {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/ping`);
    try {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("API status!")
          .setDescription(`***${data.gecko_says}*** \n CoinGecko API`)
          .setThumbnail(
            `https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png`
          )
          .setTimestamp()
      );
    } catch (err) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("We are sorry but...")
          .setDescription(
            "The CoinGecko api seems to be down, try executing the command again later..."
          )
          .setThumbnail(
            `https://media0.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif?cid=ecf05e47c4dpryzlle85fupuks97v0rkpr12y56izayy9omc&rid=giphy.gif`
          )
          .setTimestamp()
      );
    }
  },
};
