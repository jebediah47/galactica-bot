import { Event } from "../interfaces";

export const event: Event = {
  name: "ready",
  run: (client) => {
    if (client.user != null) {
      process.stdout.write(`We have logged in as ${client.user.tag} \n`);
      client.user.setActivity(`${client.config.BOT_PRESENCE}`, {
        type: client.config.BOT_PRESENCE_TYPE,
      });
    }
  },
};
