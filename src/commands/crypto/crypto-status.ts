import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "crypto-status",
  aliases: [],
  run: async (client, message, args) => {
    const errEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Notice!")
      .setDescription(
        "You need to add the full name of the cryptocurrency and your currency id e.x. \n" +
          `\`\`\`${client.config.PREFIX}price bitcoin usd\`\`\` \n` +
          "And here is a list of all the available cryptos/tokens and currency codes \n https://www.coingecko.com"
      );
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/ping`);
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("API status!")
          .setDescription(`***${data.gecko_says}*** \n CoinGecko API!`)
          .setThumbnail(
            `https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png`
          )
          .setTimestamp()
      );
    } catch (err) {
      return message.channel.send({ embed: errEmbed });
    }
  },
};
