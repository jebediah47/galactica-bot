import { EmbedBuilder } from "discord.js";
import { Queue, Song } from "distube";
import { Event } from "../../interfaces";

export const event: Event = {
  name: "playSong",
  run: (client, queue: Queue, song: Song) => {
    if (typeof song.thumbnail === "string") {
      const embed = new EmbedBuilder()
        .setTitle("Playing a song...")
        .setColor("Random")
        .setDescription(`Song: [\`${song.name}\`](${song.url})`)
        .addFields(
          { name: "💡 Requested by:", value: `>>> ${song.user}`, inline: true },
          {
            name: "⏱ Duration:",
            value: `>>> \`${song.formattedDuration}\``,
            inline: true,
          },
          {
            name: "🌀 Queue:",
            value: `>>> \`${queue.songs.length} song(s) - ${queue.formattedDuration}\``,
            inline: true,
          },
          {
            name: "🔊 Volume:",
            value: `>>> \`${queue.volume} %\``,
            inline: true,
          },
          {
            name: "♾ Loop:",
            value: `>>> ${
              queue.repeatMode
                ? queue.repeatMode === 2
                  ? "✅ Queue"
                  : "✅ Song"
                : "❌"
            }`,
            inline: true,
          },
          {
            name: "❔ Download Song:",
            value: `>>> [\`Click here\`](${song.streamURL})`,
            inline: true,
          }
        )
        .setTimestamp()
        .setImage(song.thumbnail);
      queue.textChannel?.send({ embeds: [embed] });
    }
  },
};
