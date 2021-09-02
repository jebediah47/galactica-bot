import { capitalize, commaFormatter } from "../../functions";
import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "ethereum",
  aliases: ["eth", "ETHEREUM", "ETH"],
  run: async (client, message, args) => {
    let ethereum = `ethereum`;
    let irl_currency: string = args[0];

    const errEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Notice!")
      .setDescription(
        "You need to add the full name of the cryptocurrency and your currency id e.x. \n" +
          `\`\`\`${client.config.PREFIX}price bitcoin usd\`\`\` \n` +
          "And here is a list of all the available cryptos/tokens and currency codes \n https://www.coingecko.com"
      );

    if (irl_currency === undefined) {
      irl_currency = "usd";
    } else {
      console.log((error) => error);
    }
    try {
      ethereum = encodeURIComponent(ethereum).toLowerCase();
      irl_currency = encodeURIComponent(irl_currency).toLowerCase();
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ethereum}&vs_currencies=${irl_currency}&include_24hr_change=true`
      );

      if (data[ethereum][irl_currency] === undefined) {
        return message.channel.send(
          new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("We are sorry but...")
            .setDescription(
              "We couldn't find your currency code on the list here are the \n supported currencies by the [CoinGecko API](https://api.coingecko.com/api/v3/simple/supported_vs_currencies)"
            )
            .setThumbnail(
              `https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png`
            )
            .setTimestamp()
        );
      }

      const regularToken = `${data[ethereum][irl_currency]}`;
      const change = `${
        data[ethereum][irl_currency + "_24h_change"]
      }`.substring(
        0,
        `${data[ethereum][irl_currency + "_24h_change"]}`.length - 13
      );
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(
            capitalize(ethereum) + " " + irl_currency.toUpperCase() + " price!"
          )
          .setDescription(
            `**Price:** \`${commaFormatter(regularToken)}\` ` +
              irl_currency.toUpperCase() +
              `\n **(24hr) Change:** \`${change}%\` \n` +
              `*Powered by CoinGecko API*`
          )
          .setThumbnail(
            `https://www.azcryptoexchanges.com/wp-content/uploads/2018/02/ethereum-1.png`
          )
          .setTimestamp()
      );
    } catch (err) {
      return message.channel.send({ embed: errEmbed });
    }
  },
};
