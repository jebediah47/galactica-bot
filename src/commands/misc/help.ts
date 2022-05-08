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
          value: `**Aliases**: \`["btc", "BITCOIN", "BTC"]\`\n Shows current [\`$BTC\`](https://coinmarketcap.com/currencies/bitcoin/) price`,
        },
        {
          name: `\`${client.config.PREFIX}ethereum\``,
          value: `**Aliases**: \`["eth", "ETHEREUM", "ETH"]\`\n Shows current [\`$ETH\`](https://coinmarketcap.com/currencies/ethereum/) price`,
        },
        {
          name: `\`${client.config.PREFIX}crypto\``,
          value: `**Aliases**: \`["crypto-price"]\`\n Shows the price of any crypto`,
        }
      )
      .setTimestamp();

    const funEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Fun commands list")
      .addFields(
        {
          name: `\`${client.config.PREFIX}avatar\``,
          value: `**Aliases**: \`["pfp"]\`\n Shows you any mentioned user's avatar`,
        },
        {
          name: `\`${client.config.PREFIX}bored\``,
          value: `**Aliases**: \`["activity", "idea", "brd"]\`\n Suggests a random activity for you to do!`,
        },
        {
          name: `\`${client.config.PREFIX}tictactoe\``,
          value: `**Aliases**: \`none\`\n Creates a tictactoe game for you to play against the bot!`,
        },
        {
          name: `\`${client.config.PREFIX}translate\``,
          value: `**Aliases**: \`["langtrans", "google-translate"]\`\n Send something in any language and this command will translate it for you`,
        },
        {
          name: `\`${client.config.PREFIX}catfact\``,
          value: `**Aliases**: \`["cat-fact", "catFact"]\`\n Sends a random cat-fact in the cat`,
        }
      )
      .setTimestamp();

    const miscEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Misc command list:")
      .addFields(
        {
          name: `\`${client.config.PREFIX}dictionary\``,
          value: `**Aliases**: \`["urban-dictionary"]\`\n A fully-fledged english dictionary`,
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}github\``,
          value: `**Aliases**: \`none\`\n Search any GitHub profile with the use of this command`,
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}ping\``,
          value: `**Aliases**: \`["pp"]\`\n Shows you the bot's ping`,
        },
        {
          name: `\`${client.config.PREFIX}qr\``,
          value: `**Aliases**: \`["qrcode", "qr-code"]\`\n Converts any text you enter to a QR code`,
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}stats\``,
          value: `**Aliases**: \`["bot-stats", "botstats"]\`\n Shows the stats of the current bot session`,
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
          value: `**Aliases**: \`none\`\n Gives you the ability to ban any member`,
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}clear\``,
          value: `**Aliases**: \`["purge", "cls"]\`\n Purges a specified amount of messages`,
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}lock\``,
          value: `**Aliases**: \`none\`\n Locks any or the current channel`,
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}unlock\``,
          value: `**Aliases**: \`none\`\n Unlocks any or the current channel`,
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}kick\``,
          value: `**Aliases**: \`none\`\n Gives you the ability to kick any members`,
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}shutdown\``,
          value: `**Aliases**: \`["poweroff"]\`\n Shuts down the bot...`,
          inline: true,
        }
      )
      .setTimestamp();

    const musicEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Music commands list:")
      .addFields(
        {
          name: `\`${client.config.PREFIX}play\``,
          value: `**Aliases**: \`["p"]\`\n Plays music`,
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}skip\``,
          value: `**Aliases**: \`["s", "skp"]\`\n Skips the song currently playing`,
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}stop\``,
          value: `**Aliases**: \`["pause"]\`\n Pauses the queue`,
        },
        {
          name: `\`${client.config.PREFIX}resume\``,
          value: `**Aliases**: \`["rs", "continue"]\`\n Resumes the queue`,
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}repeat\``,
          value: `**Aliases**: \`["rp", "loop"]\`\n Sets the repeat mode of the queue`,
          inline: true,
        },
        {
          name: `\`${client.config.PREFIX}volume\``,
          value: `**Aliases**: \`["v", "vol", "set-volume"]\`\n Sets the volume of the queue`,
        },
        {
          name: `\`${client.config.PREFIX}disconnect\``,
          value: `**Aliases**: \`["leave"]\`\n Disconnects the bot from the voice channel`,
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
    try {
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
    } catch (err) {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("We are sorry but...")
        .setDescription(`${err}`)
        .setFooter({
          text: "Please try running the command again",
        })
        .setTimestamp();
      return message.channel.send({ embeds: [embed] });
    }
  },
};
