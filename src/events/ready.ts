import { Event } from "../interfaces";

export const event: Event = {
  name: "ready",
  run: (client) => {
    //@ts-ignore
    process.stdout.write(`We have logged in as ${client.user.tag} \n`);
    //@ts-ignore
    client.user.setActivity(`${client.config.BOT_PRESENCE}`, {
      //@ts-ignore
      type: `${client.config.BOT_PRESENCE_TYPE}`,
    });
  },
};
