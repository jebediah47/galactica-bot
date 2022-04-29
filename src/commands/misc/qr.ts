import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "qr",
  aliases: ["qrcode", "qr-code"],
  run: async (client, message, args) => {
    let text: string = args.join(" ");
    if (!text) {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Notice!")
        .setDescription(
          "You need to add a text input so it can be converted to a QR-code"
        )
        .setTimestamp();
      return message.channel.send({ embeds: [embed] });
    }
    try {
      const pleaseWait = message.channel.send(
        "Please wait while your text is converted to QR-code"
      );
      text = encodeURIComponent(text);
      const embed1 = new MessageEmbed()
        .setImage(
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`
        )
        .setColor("RANDOM")
        .setTimestamp();
      (await pleaseWait).edit({ embeds: [embed1] });
    } catch (err) {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${err}`)
        .setTimestamp();
      return message.reply({ embeds: [embed] });
    }
  },
};
