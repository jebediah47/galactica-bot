import { Event } from "../interfaces";
import { PREFIX } from "../../config.json";

export const event: Event = {
  name: "ready",
  run: (client) => {
    console.log(`We have logged in as ${client.user.tag}`);
    client.user.setActivity(`vibe.io | ${PREFIX}help`, { type: "COMPETING" });
  },
};
