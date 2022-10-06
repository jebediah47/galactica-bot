import { EmbedBuilder } from "discord.js";
import { Queue, Song } from "distube";
import { Event } from "../../interfaces";

export const event: Event = {
  name: "addSong",
  run: (client, queue: Queue, song: Song) => {
    if (typeof song.thumbnail === "string") {
      const embed = new EmbedBuilder()
        .setTitle("Added a song to queue...")
        .setColor("Random")
        .setDescription(`Song: [\`${song.name}\`](${song.url})`)
        .addFields(
          {
            name: "💡 Requested by:",
            value: `>>> ${song.user}`,
            inline: true,
          },
          {
            name: "⏱ Duration:",
            value: `>>> \`${song.formattedDuration}\``,
            inline: true,
          },
          {
            name: "🌀 Queue:",
            value: `>>> \`${queue.songs.length} song(s) - ${queue.formattedDuration}\``,
            inline: true,
          }
        )
        .setTimestamp()
        .setImage(song.thumbnail);
      queue.textChannel?.send({ embeds: [embed] });
    }
  },
};
