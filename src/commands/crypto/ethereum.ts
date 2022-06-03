import { capitalize, commaFormatter } from "../../functions";
import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "ethereum",
  description: "Displays current Ethereum price.",
  options: [
    {
      name: "currency-code",
      description: "Currency code e.g. eur",
      type: "STRING",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const ethereum = `ethereum`;
    let irl_currency = args.getString("currency-code") || "usd";
    irl_currency = irl_currency.toLowerCase();
    const errEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Notice!")
      .setDescription(
        "You need to add the full name of the cryptocurrency and your currency id e.x. \n" +
          `\`\`\`/ethereum usd\`\`\` \n` +
          "And here is a list of all the available cryptos/tokens and currency codes \n https://www.coingecko.com"
      );

    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ethereum}&vs_currencies=${irl_currency}&include_24hr_change=true`
      );

      if (data[ethereum][irl_currency] === undefined) {
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
        return interaction.reply({ embeds: [embed] });
      }

      const regularToken = `${data[ethereum][irl_currency]}`;
      const change = `${
        data[ethereum][irl_currency + "_24h_change"]
      }`.substring(
        0,
        `${data[ethereum][irl_currency + "_24h_change"]}`.length - 13
      );
      const embed2 = new MessageEmbed()
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
          `https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png`
        )
        .setTimestamp();
      return interaction.reply({ embeds: [embed2] });
    } catch (err) {
      return interaction.reply({ embeds: [errEmbed] });
    }
  },
};
