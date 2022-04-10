import { Command } from "../../interfaces";

export const command: Command = {
  name: "play",
  aliases: ["p"],
  run: (client, message, args) => {
    if (!message.member?.voice.channel)
      return message.channel.send(
        "You must be in a voice channel to use this command."
      );
    const music = args.join(" ");
    if (!music) {
      return message.channel.send(
        "Please enter a song url or query to search."
      );
    }
    //@ts-ignore
    client.distube?.play(message.member.voice.channel, music, {
      member: message.member,
      textChannel: message.channel,
      message,
    });
  },
};
