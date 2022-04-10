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
      await client.distube?.skip(message);
      message.channel.send(`Skipped song!`);
    } catch (err) {
      return message.channel.send(`${err}`);
    }
  },
};
