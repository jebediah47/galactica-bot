import { MessageEmbed } from "discord.js";
import { Queue, Song } from "distube";
import { Event } from "../interfaces";

export const event: Event = {
  name: "addSong",
  run: (client, queue: Queue, song: Song) => {
    const embed = new MessageEmbed()
      .setTitle("Added a son to queue...")
      .setColor("RANDOM")
      .setDescription(`Song: [\`${song.name}\`](${song.url})`)
      .addField("💡 Requested by:", `>>> ${song.user}`, true)
      .addField("⏱ Duration:", `>>> \`${song.formattedDuration}\``, true)
      .addField(
        "🌀 Queue:",
        `>>> \`${queue.songs.length} song(s) - ${queue.formattedDuration}\``,
        true
      )
      .setTimestamp()
      //@ts-ignore
      .setImage(song.thumbnail);
    queue.textChannel?.send({ embeds: [embed] });
  },
};
