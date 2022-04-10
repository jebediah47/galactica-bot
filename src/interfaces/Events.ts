import Client from "../client";
import { DisTubeEvents } from "distube";
import { ClientEvents } from "discord.js";

interface Run {
  //@ts-ignore
  (client: Client, ...args: any[]);
}

export interface Event {
  name: keyof ClientEvents | keyof DisTubeEvents;
  run: Run;
}
