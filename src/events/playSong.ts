import { Queue, Song } from "distube";
import { Event } from "../interfaces";

export const event: Event = {
  name: "playSong",
  run: (client, queue: Queue, song: Song) => {
    queue.textChannel?.send(
      `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
    );
  },
};
