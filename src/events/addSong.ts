import { Queue, Song } from "distube";
import { Event } from "../interfaces";

export const event: Event = {
  name: "addSong",
  run: (client, queue: Queue, song: Song) => {
    queue.textChannel?.send(
      `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    );
  },
};
