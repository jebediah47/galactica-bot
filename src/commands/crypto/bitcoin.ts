import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import axios from "axios";
import { capitalize, commaFormatter } from "@/functions";
import { Command } from "@/interfaces";

export const command: Command = {
  name: "bitcoin",
  description: "Displays current Bitcoin price.",
  options: [
    {
      name: "currency-code",
      description: "Currency code e.g. eur",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const bitcoin = `bitcoin`;
    let irl_currency = args.getString("currency-code") || "usd";
    irl_currency = irl_currency.toLowerCase();
    const errEmbed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Notice!")
      .setDescription(
        "You need to add the full name of the cryptocurrency and your currency id e.x. \n" +
          `\`\`\`/bitcoin usd\`\`\` \n` +
          "And here is a list of all the available cryptos/tokens and currency codes \n https://www.coingecko.com",
      );

    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${bitcoin}&vs_currencies=${irl_currency}&include_24hr_change=true`,
      );

      if (data[bitcoin][irl_currency] === undefined) {
        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("We are sorry but...")
          .setDescription(
            "We couldn't find your currency code on the list here are the supported currencies by the \n [CoinGecko API](https://api.coingecko.com/api/v3/simple/supported_vs_currencies)",
          )
          .setThumbnail(
            `https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png`,
          )
          .setTimestamp();
        return interaction.reply({ embeds: [embed] });
      }

      const regularToken = `${data[bitcoin][irl_currency]}`;
      const change = `${data[bitcoin][irl_currency + "_24h_change"]}`.substring(
        0,
        `${data[bitcoin][irl_currency + "_24h_change"]}`.length - 13,
      );
      const embed2 = new EmbedBuilder()
        .setColor("Random")
        .setTitle(
          capitalize(bitcoin) + " " + irl_currency.toUpperCase() + " price!",
        )
        .setDescription(
          `**Price:** \`${commaFormatter(regularToken)}\` ` +
            irl_currency.toUpperCase() +
            `\n **(24hr) Change:** \`${change}%\` \n` +
            `*Powered by CoinGecko API*`,
        )
        .setThumbnail(`https://bitcoin.org/img/icons/opengraph.png?1625742893`)
        .setTimestamp();
      await interaction.reply({ embeds: [embed2] });
    } catch (err) {
      return interaction.reply({ embeds: [errEmbed] });
    }
  },
};
