import { ClientEvents } from "discord.js";
import { DisTubeEvents } from "distube";
import Client from "../client";

interface Run {
  (client: Client, ...args: any[]): void;
}

export interface Event {
  name: keyof ClientEvents | keyof DisTubeEvents;
  run: Run;
}
