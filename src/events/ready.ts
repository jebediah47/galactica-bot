import { Event } from "../interfaces";

export const event: Event = {
  name: "ready",
  run: (client) => {
    process.stdout.write(`We have logged in as ${client.user.tag} \n`);
    // eslint-disable-next-line no-console
    client.user.setActivity(`${client.config.BOT_PRESENCE}`, {
      //@ts-ignore
      type: `${client.config.BOT_PRESENCE_TYPE}`,
    });
  },
};
