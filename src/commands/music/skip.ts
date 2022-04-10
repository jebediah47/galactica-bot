import { Command } from "../../interfaces";

export const command: Command = {
  name: "skip",
  aliases: ["s", "skp"],
  run: async (client, message) => {
    const queue = client.distube?.getQueue(message);
    if (!queue) {
      return message.channel.send("There is nothing in the queue!");
    }
    try {
      const song = await queue.skip();
      message.channel.send(`Skipped! Now playing:\n${song.name}`);
    } catch (e) {
      return message.channel.send(`${e}`);
    }
    client.distube?.skip(message);
  },
};
