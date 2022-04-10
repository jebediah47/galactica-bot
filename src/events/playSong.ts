import { MessageEmbed } from "discord.js";
import { Queue, Song } from "distube";
import { Event } from "../interfaces";

export const event: Event = {
  name: "playSong",
  run: (client, queue: Queue, song: Song) => {
    const embed = new MessageEmbed()
      .setTitle("Playing a song...")
      .setColor("RANDOM")
      .setDescription(`Song: [\`${song.name}\`](${song.url})`)
      .addField("💡 Requested by:", `>>> ${song.user}`, true)
      .addField("⏱ Duration:", `>>> \`${song.formattedDuration}\``, true)
      .addField(
        "🌀 Queue:",
        `>>> \`${queue.songs.length} song(s) - ${queue.formattedDuration}\``,
        true
      )
      .addField("🔊 Volume:", `>>> \`${queue.volume} %\``, true)
      .addField(
        "♾ Loop:",
        `>>> ${
          queue.repeatMode
            ? queue.repeatMode === 2
              ? "✅ Queue"
              : "✅ Song"
            : "❌"
        }`,
        true
      )
      .addField(
        "❔ Download Song:",
        `>>> [\`Click here\`](${song.streamURL})`,
        true
      )
      .setTimestamp()
      //@ts-ignore
      .setImage(song.thumbnail);
    queue.textChannel?.send({ embeds: [embed] });
  },
};
