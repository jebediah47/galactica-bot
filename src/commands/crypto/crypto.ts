import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "crypto",
  aliases: ["crypto-price"],
  run: async (client, message, args) => {
    let token: string = args[0];
    let irl_currency: string = args[1];

    const errEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Notice!")
      .setDescription(
        "You need to add the full name of the cryptocurrency and your currency id e.x. \n" +
          `\`\`\`${client.config.PREFIX}price bitcoin usd\`\`\` \n` +
          "And here is a list of all the available cryptos/tokens and currency codes \n https://www.coingecko.com"
      );

    if (token === undefined) {
      return message.channel.send({ embed: errEmbed });
    } else if (irl_currency === undefined) {
      irl_currency = "usd";
    } else {
      console.log((err) => err);
    }

    try {
      token = encodeURIComponent(token).toLowerCase();
      irl_currency = encodeURIComponent(irl_currency).toLowerCase();
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=${irl_currency}&include_market_cap=true&include_24hr_change=true`
      );

      if (!data) {
        return message.channel.send(
          new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("We are sorry but...")
            .setDescription(
              "We couldn't fetch the required data from the API, maybe try executing the command again!"
            )
            .setTimestamp()
        );
      }

      function capitalize(s) {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
      }

      function commaFormatter(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }

      const regularToken = `${data[token][irl_currency]}`;
      const change = `${data[token].usd_24h_change}`.substring(
        0,
        `${data[token].usd_24h_change}`.length - 13
      );
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(
            capitalize(token) + " " + irl_currency.toUpperCase() + " price!"
          )
          .setDescription(
            `**Price:** \`${commaFormatter(regularToken)}\` ` +
              irl_currency.toUpperCase() +
              `\n **(24hr) Change:** \`${change}%\``
          )
          .setTimestamp()
      );
    } catch (err) {
      return message.channel.send({ embed: errEmbed });
    }
  },
};
