import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "play",
  aliases: ["p"],
  run: (client, message, args) => {
    if (!message.member?.voice.channel) {
      const noVoiceChannel = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Error!")
        .setDescription("You must be in a voice channel to use this command!")
        .setTimestamp();
      return message.channel.send({ embeds: [noVoiceChannel] });
    }
    const music = args.join(" ");
    if (!music) {
      const noMusic = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Error!")
        .setDescription("Please enter a song URL or query to search")
        .setTimestamp();
      return message.channel.send({ embeds: [noMusic] });
    }
    if (message.channel.type === "GUILD_TEXT")
      client.distube?.play(message.member.voice.channel, music, {
        member: message.member,
        textChannel: message.channel,
        message,
      });
  },
};
