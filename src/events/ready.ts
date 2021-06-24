import { Event } from "../interfaces";

export const event: Event = {
  name: "ready",
  run: (client) => {
    console.log(`${client.user.tag} is online!`);
  },
};
