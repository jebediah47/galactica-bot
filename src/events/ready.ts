import { Event } from "../interfaces";
import { stdout } from "process";

export const event: Event = {
  name: "ready",
  run: (client) => {
    stdout.write(`We have logged in as ${client.user.tag} \n`);
    client.user.setActivity(`${client.config.BOT_PRESENCE}`, {
      //@ts-ignore
      type: `${client.config.BOT_PRESENCE_TYPE}`,
    });
  },
};
