import { capitalize, commaFormatter } from "../../functions";
import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "crypto",
  description: "Displays the current price of any cryptocurrency",
  options: [
    {
      name: "crypto-code",
      description: "Cryptocurrency code e.x. dogecoin",
      type: "STRING",
      required: true,
    },
    {
      name: "currency-code",
      description: "Currency code e.g. eur",
      type: "STRING",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const errEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Notice!")
      .setDescription(
        "You need to add the full name of the cryptocurrency and your currency id e.x. \n" +
          `\`\`\`/crypto bitcoin usd\`\`\` \n` +
          "And here is a list of all the available cryptos/tokens and currency codes \n https://www.coingecko.com"
      );

    let token = args.getString("crypto-code");
    let irl_currency = args.getString("currency-code") || "usd";
    try {
      if (!token) return;
      token = token.toLowerCase();
    } catch (err) {
      return interaction.reply({ embeds: [errEmbed] });
    }
    irl_currency = irl_currency.toLowerCase();

    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=${irl_currency}&include_market_cap=true&include_24hr_change=true`
      );

      if (data[token][irl_currency] === undefined) {
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("We are sorry but...")
          .setDescription(
            "We couldn't find your currency code on the list here are the supported currencies by the \n [CoinGecko API](https://api.coingecko.com/api/v3/simple/supported_vs_currencies)"
          )
          .setTimestamp();
        return interaction.reply({ embeds: [embed] });
      }

      if (!data) {
        const embed2 = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("We are sorry but...")
          .setDescription(
            "We couldn't fetch the required data from the API, maybe try executing the command again!"
          )
          .setTimestamp();
        return interaction.reply({ embeds: [embed2] });
      }

      const regularToken = `${data[token][irl_currency]}`;
      const change = `${data[token][irl_currency + "_24h_change"]}`.substring(
        0,
        `${data[token][irl_currency + "_24h_change"]}`.length - 13
      );
      const embed3 = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(
          capitalize(token) + " " + irl_currency.toUpperCase() + " price!"
        )
        .setDescription(
          `**Price:** \`${commaFormatter(regularToken)}\` ` +
            irl_currency.toUpperCase() +
            `\n **(24hr) Change:** \`${change}%\` \n` +
            `*Powered by CoinGecko API*`
        )
        .setTimestamp();
      await interaction.reply({ embeds: [embed3] });
    } catch (err) {
      return interaction.reply({ embeds: [errEmbed] });
    }
  },
};
