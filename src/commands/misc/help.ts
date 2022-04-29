import {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  Interaction,
} from "discord.js";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "help",
  aliases: ["h"],
  run: (client, message) => {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Help command categories:")
      .addFields(
        { name: "🖥️ Crypto", value: "Crypto related commands" },
        { name: "🤪 Fun", value: "Fun related commands" },
        { name: "🛰️ Misc", value: "Miscellaneous commands" },
        {
          name: "🛡️ Moderation",
          value: "Administration commands",
        },
        { name: "🎵 Music", value: "Music commands" }
      )
      .setTimestamp();
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("Select category:")
        .addOptions([
          {
            label: "🖥️ Crypto",
            value: "first_option",
          },
          {
            label: "🤪 Fun",
            value: "second_option",
          },
          {
            label: "🛰️ Misc",
            value: "third_option",
          },
          {
            label: "🛡️ Moderation",
            value: "fourth_option",
          },
          {
            label: "🎵 Music",
            value: "fifth_option",
          },
        ])
    );

    const cryptoEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Crypto commands list:")
      .addFields(
        {
          name: `\`${client.config.PREFIX}bitcoin\``,
          value: `Shows current [\`$BTC\`](https://coinmarketcap.com/currencies/bitcoin/) price`,
        },
        {
          name: `\`${client.config.PREFIX}ethereum\``,
          value: `Shows current [\`$ETH\`](https://coinmarketcap.com/currencies/ethereum/) price`,
        },
        {
          name: `\`${client.config.PREFIX}crypto\``,
          value: "Shows the price of any crypto",
        }
      )
      .setTimestamp();

    const funEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Fun commands list")
      .addFields(
        {
          name: `\`${client.config.PREFIX}avatar\``,
          value: "Shows you any mentioned user's avatar",
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}bored\``,
          value: "Suggests a random activity for you to do!",
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}catfact\``,
          value: "Sends a random cat-fact in the cat",
        },
        {
          name: `\`${client.config.PREFIX}meme\``,
          value: "Sends a random meme",
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}translate\``,
          value:
            "Send something in any language and this command will translate it for you",
          inline: true,
        }
      )
      .setTimestamp();

    const miscEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Misc command list:")
      .addFields(
        {
          name: `\`${client.config.PREFIX}dictionary\``,
          value: "A fully-fledged english dictionary",
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}github\``,
          value: "Search any GitHub profile with the use of this command",
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}ping\``,
          value: "Shows you the bot's ping",
        },
        {
          name: `\`${client.config.PREFIX}qr\``,
          value: "Converts any text you enter to a QR code",
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}stats\``,
          value: "Shows the stats of the current bot session",
          inline: true,
        }
      )
      .setTimestamp();

    const modEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Moderation commands list:")
      .addFields(
        {
          name: `\`${client.config.PREFIX}ban\``,
          value: "Gives you the ability to ban any member",
        },
        {
          name: `\`${client.config.PREFIX}clear\``,
          value: "Purges a specified amount of messages",
        },
        {
          name: `\`${client.config.PREFIX}kick\``,
          value: "Gives you the ability to kick any members",
        }
      )
      .setTimestamp();

    const musicEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Music commands list:")
      .addFields(
        {
          name: `\`${client.config.PREFIX}play\``,
          value: "Plays music",
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}skip\``,
          value: "Skips the song currently playing",
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}stop\``,
          value: "Pauses the queue",
        },
        {
          name: `\`${client.config.PREFIX}resume\``,
          value: "Resumes the queue",
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}repeat\``,
          value: "Sets the repeat mode of the queue",
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}volume\``,
          value: "Sets the volume of the queue",
        },
        {
          name: `\`${client.config.PREFIX}disconnect\``,
          value: "Disconnects the bot from the voice channel",
          inline: true,
        }
      )
      .setTimestamp();

    const filter = (interaction: Interaction): boolean => {
      interaction.isSelectMenu();
      return true;
    };
    const collector = message.channel.createMessageComponentCollector({
      filter,
      maxComponents: 5,
    });
    collector.on("collect", async (collected: any) => {
      const value = collected.values[0];
      collected.deferUpdate();
      switch (value) {
        case "first_option":
          message.channel.send({ embeds: [cryptoEmbed] });
          break;
        case "second_option":
          message.channel.send({ embeds: [funEmbed] });
          break;
        case "third_option":
          message.channel.send({ embeds: [miscEmbed] });
          break;
        case "fourth_option":
          message.channel.send({ embeds: [modEmbed] });
          break;
        case "fifth_option":
          message.channel.send({ embeds: [musicEmbed] });
          break;
      }
    });
    message.channel.send({ embeds: [embed], components: [row] });
  },
};
