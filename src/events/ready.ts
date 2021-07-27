import { Event } from "../interfaces";

export const event: Event = {
  name: "ready",
  run: (client) => {
    console.log(`We have logged in as ${client.user.tag}`);
    client.user.setActivity(`${client.config.BOT_PRESENCE}`, {
      type: "COMPETING",
    });
  },
};
