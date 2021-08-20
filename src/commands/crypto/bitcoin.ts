import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "bitcoin",
  aliases: ["btc", "BITCOIN", "BTC"],
  run: async (client, message, args) => {
    let bitcoin = `bitcoin`;
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
      bitcoin = encodeURIComponent(bitcoin).toLowerCase();
      irl_currency = encodeURIComponent(irl_currency).toLowerCase();
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${bitcoin}&vs_currencies=${irl_currency}&include_24hr_change=true`
      );

      if (data[bitcoin][irl_currency] === undefined) {
        return message.channel.send(
          new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("We are sorry but...")
            .setDescription(
              "We couldn't find your currency code on the list here are the supported currencies by the \n [CoinGecko API](https://api.coingecko.com/api/v3/simple/supported_vs_currencies)"
            )
            .setThumbnail(
              `https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png`
            )
            .setTimestamp()
        );
      }

      const capitalize = (s) => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
      };

      const commaFormatter = (x) => {
        const parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      };

      const regularToken = `${data[bitcoin][irl_currency]}`;
      const change = `${data[bitcoin][irl_currency + "_24h_change"]}`.substring(
        0,
        `${data[bitcoin][irl_currency + "_24h_change"]}`.length - 13
      );
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(
            capitalize(bitcoin) + " " + irl_currency.toUpperCase() + " price!"
          )
          .setDescription(
            `**Price:** \`${commaFormatter(regularToken)}\` ` +
              irl_currency.toUpperCase() +
              `\n **(24hr) Change:** \`${change}%\``
          )
          .setThumbnail(
            `https://bitcoin.org/img/icons/opengraph.png?1625742893`
          )
          .setTimestamp()
      );
    } catch (err) {
      return message.channel.send({ embed: errEmbed });
    }
  },
};
