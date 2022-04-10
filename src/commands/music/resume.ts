import { Command } from "../../interfaces";

export const command: Command = {
  name: "resume",
  aliases: ["rs", "continue"],
  run: (client, message) => {
    const queue = client.distube?.getQueue(message);
    if (!queue) {
      return message.channel.send(`There is nothing in the queue right now!`);
    }
    queue.resume();
    message.channel.send("The song has been resumed!");
  },
};
