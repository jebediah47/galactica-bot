import { Command } from "../../interfaces";

export const command: Command = {
  name: "stop",
  aliases: ["s", "pause"],
  run: (client, message) => {
    const queue = client.distube?.getQueue(message);
    if (!queue) {
      return message.channel.send(`There is nothing in the queue right now!`);
    } else if (queue.paused) {
      queue.resume();
      return message.channel.send(
        "The song was already paused but I resumed it for you 😃"
      );
    }
    message.channel.send("The queue has been stopped!");
    client.distube?.pause(message);
  },
};
