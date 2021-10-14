import { capitalize, commaFormatter } from "../../functions";
import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "bitcoin",
  aliases: ["btc", "BITCOIN", "BTC"],
  run: async (client, message, args) => {
    const bitcoin = `bitcoin`;
    const irl_currency = args[0].toLowerCase() || "usd";

    const errEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Notice!")
      .setDescription(
        "You need to add the full name of the cryptocurrency and your currency id e.x. \n" +
          `\`\`\`${client.config.PREFIX}price bitcoin usd\`\`\` \n` +
          "And here is a list of all the available cryptos/tokens and currency codes \n https://www.coingecko.com"
      );

    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${bitcoin}&vs_currencies=${irl_currency}&include_24hr_change=true`
      );

      if (data[bitcoin][irl_currency] === undefined) {
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("We are sorry but...")
          .setDescription(
            "We couldn't find your currency code on the list here are the supported currencies by the \n [CoinGecko API](https://api.coingecko.com/api/v3/simple/supported_vs_currencies)"
          )
          .setThumbnail(
            `https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png`
          )
          .setTimestamp();
        return message.channel.send({ embeds: [embed] });
      }

      const regularToken = `${data[bitcoin][irl_currency]}`;
      const change = `${data[bitcoin][irl_currency + "_24h_change"]}`.substring(
        0,
        `${data[bitcoin][irl_currency + "_24h_change"]}`.length - 13
      );
      const embed2 = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(
          capitalize(bitcoin) + " " + irl_currency.toUpperCase() + " price!"
        )
        .setDescription(
          `**Price:** \`${commaFormatter(regularToken)}\` ` +
            irl_currency.toUpperCase() +
            `\n **(24hr) Change:** \`${change}%\` \n` +
            `*Powered by CoinGecko API*`
        )
        .setThumbnail(`https://bitcoin.org/img/icons/opengraph.png?1625742893`)
        .setTimestamp();
      return message.channel.send({ embeds: [embed2] });
    } catch (err) {
      return message.channel.send({ embeds: [errEmbed] });
    }
  },
};
