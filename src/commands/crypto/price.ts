import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "price",
  aliases: ["crypto"],
  run: async (client, message, args) => {
    let token: string = args[0];
    let irl_currency: string = args[1];

    if (token == undefined) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Notice!")
          .setDescription(
            "You need to add the full name of the cryptocurrency and your currency id e.x. \n" +
              `\`\`\`${client.config.PREFIX}price bitcoin usd\`\`\` \n` +
              "And here is a list of all the available cryptos/tokens \n https://www.coingecko.com"
          )
      );
    } else if (irl_currency === undefined) {
      irl_currency = "usd";
    }

    token = encodeURIComponent(token).toLowerCase();
    irl_currency = encodeURIComponent(irl_currency).toLowerCase();
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=${irl_currency}&include_market_cap=true&include_24hr_change=true`
    );

    if (!data) {
      message.channel.send(
        new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("We are sorry but...")
          .setDescription(
            "We couldn't fetch the required data from the API, maybe try executing the command again!"
          )
          .setTimestamp()
      );
    }

    const capitalize = (s) => {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    message.channel.send(
      new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(
          capitalize(token) + " " + irl_currency.toUpperCase() + " price!"
        )
        .setDescription(
          `Price: \`${data[token][irl_currency]}\` ` +
            irl_currency.toUpperCase()
        )
        .setTimestamp()
    );
  },
};
