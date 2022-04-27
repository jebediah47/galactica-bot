import Client from "../client";
import { DisTubeEvents } from "distube";
import { ClientEvents } from "discord.js";

interface Run {
  (client: Client, ...args: any[]): void;
}

export interface Event {
  name: keyof ClientEvents | keyof DisTubeEvents;
  run: Run;
}
