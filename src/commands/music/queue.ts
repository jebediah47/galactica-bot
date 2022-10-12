import { pagination } from "@devraelfreeze/discordjs-pagination";
import { Embed, EmbedBuilder } from "discord.js";
import { GuildIdResolvable } from "distube";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "queue",
  description: "Shows the music queue",
  run: async (client, interaction) => {
    const queue = client.distube.getQueue(interaction as GuildIdResolvable);
    if (!queue)
      return interaction.reply({
        content: "There is nothing currently playing in the queue!",
      });
    const q: string = queue.songs
      .map(
        (song, i) =>
          `${i === 0 ? "🔊 **Playing:**" : `**${i}.**`} ${song.name} - \`${
            song.formattedDuration
          }\``
      )
      .join("\n");

    const embeds = [];
    for (let i = 0; i < q.length; i += 2048) {
      const toSend = q.substring(i, Math.min(q.length, i + 2048));
      embeds.push(
        new EmbedBuilder()
          .setColor("Random")
          .setTitle("🎵 The server's music queue")
          .setDescription(toSend)
          .setTimestamp()
      );
    }

    await pagination({
      embeds: embeds as unknown as Embed[],
      author: interaction.member.user,
      interaction: interaction,
      time: 30000,
    });
  },
};
